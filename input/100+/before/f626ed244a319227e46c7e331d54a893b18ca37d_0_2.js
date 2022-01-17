function (model_options) {
  'use strict';
  var
    // Validate provided options.
    opt = (function () {
      var boundary;

      model_options = default_config.fillWithDefaultValues(model_options, default_config.DEFAULT_VALUES.model);

      // Validation.
      //
      // Check boundary settings, as they have complex structure.
      boundary = model_options.boundary.temperature_at_border || model_options.boundary.flux_at_border;
      if (!boundary) {
        throw new Error("Core model: missing boundary settings.");
      } else if (boundary.upper === undefined ||
                 boundary.right === undefined ||
                 boundary.lower === undefined ||
                 boundary.left  === undefined) {
        throw new Error("Core model: incomplete boundary settings.");
      }

      return model_options;
    }()),

    // WebGL GPGPU optimization.
    use_WebGL = opt.use_WebGL,

    // Simulation grid dimensions.
    nx = opt.grid_width,
    ny = opt.grid_height,
    array_size = nx * ny,

    // Spacing.
    delta_x = opt.model_width / nx,
    delta_y = opt.model_height / ny,

    // Simulation steps counter.
    indexOfStep = 0,

    // Physics solvers
    // (initialized later, when core model object is built).
    heatSolver,
    fluidSolver,
    ray_solver,

    // GPU versions of solvers.
    heat_solver_gpu,
    fluid_solver_gpu,

    // Optimization flags.
    radiative,
    has_part_power,

    // Performance model.
    perf = performance.makePerformanceModel(),

    //
    // Simulation arrays:
    //
    // - temperature array
    t = arrays.create(array_size, opt.background_temperature, array_type),
    // - internal temperature boundary array
    tb = arrays.create(array_size, NaN, array_type),
    // - velocity x-component array (m/s)
    u = arrays.create(array_size, 0, array_type),
    // - velocity y-component array (m/s)
    v = arrays.create(array_size, 0, array_type),
    // - internal heat generation array
    q = arrays.create(array_size, 0, array_type),
    // - wind speed
    uWind = arrays.create(array_size, 0, array_type),
    vWind = arrays.create(array_size, 0, array_type),
    // - conductivity array
    conductivity = arrays.create(array_size, opt.background_conductivity, array_type),
    // - specific heat capacity array
    capacity = arrays.create(array_size, opt.background_specific_heat, array_type),
    // - density array
    density = arrays.create(array_size, opt.background_density, array_type),
    // - fluid cell array
    fluidity = arrays.create(array_size, true, array_type),
    // - photons array
    photons = [],

    //
    // [GPGPU] Simulation textures:
    //
    // - temperature array
    t_tex,
    // - internal temperature boundary array
    tb_tex,
    // - velocity x-component array (m/s)
    u_tex,
    // - velocity y-component array (m/s)
    v_tex,
    // - internal heat generation array
    q_tex,
    // - wind speed
    uWind_tex,
    vWind_tex,
    // - conductivity array
    conductivity_tex,
    // - specific heat capacity array
    capacity_tex,
    // - density array
    density_tex,
    // - fluid cell array
    fluidity_tex,

    // Generate parts array.
    parts = (function () {
      var
        result = [],
        parts_options,
        i, len;

      if (opt.structure && opt.structure.part) {
        parts_options = opt.structure.part;
        if (parts_options.constructor !== Array) {
          parts_options = [parts_options];
        }

        result = new Array(parts_options.length);
        for (i = 0, len = parts_options.length; i < len; i += 1) {
          result[i] = new part.Part(parts_options[i]);
        }
      }
      return result;
    }()),

    //  
    // Private methods  
    //      
    initGPGPU = function () {
      // Make sure that environment is a browser.
      if (typeof window === 'undefined') {
        throw new Error("Core model: WebGL GPGPU unavailable in the node.js environment.");
      }
      // Request GPGPU utilities.
      gpgpu = energy2d.utils.gpu.gpgpu;
      // Init module.
      // Width is ny, height is nx (due to data organization).
      gpgpu.init(ny, nx);
      // Create simulation textures.
      t_tex = gpgpu.createTexture();
      tb_tex = gpgpu.createTexture();
      u_tex = gpgpu.createTexture();
      v_tex = gpgpu.createTexture();
      q_tex = gpgpu.createTexture();
      uWind_tex = gpgpu.createTexture();
      vWind_tex = gpgpu.createTexture();
      conductivity_tex = gpgpu.createTexture();
      capacity_tex = gpgpu.createTexture();
      density_tex = gpgpu.createTexture();
      fluidity_tex = gpgpu.createTexture();
    },

    updateAllTextures = function () {
      gpgpu.writeTexture(t_tex, t);
      gpgpu.writeTexture(tb_tex, tb);
      gpgpu.writeTexture(u_tex, u);
      gpgpu.writeTexture(v_tex, v);
      gpgpu.writeTexture(q_tex, q);
      gpgpu.writeTexture(uWind_tex, uWind);
      gpgpu.writeTexture(vWind_tex, vWind);
      gpgpu.writeTexture(conductivity_tex, conductivity);
      gpgpu.writeTexture(capacity_tex, capacity);
      gpgpu.writeTexture(density_tex, density);
      gpgpu.writeTexture(fluidity_tex, fluidity);
    },

    setupMaterialProperties = function () {
      var
        lx = opt.model_width,
        ly = opt.model_height,
        part, indices, idx,
        i, ii, len;

      if (!parts || parts.length === 0) {
        return;
      }

      // workaround, to treat overlapping parts as original Energy2D
      for (i = parts.length - 1; i >= 0; i -= 1) {
        part = parts[i];
        indices = part.getGridCells(nx, ny, lx, ly);
        for (ii = 0, len = indices.length; ii < len; ii += 1) {
          idx = indices[ii];

          fluidity[idx] = false;
          t[idx] = part.temperature;
          q[idx] = part.power;
          conductivity[idx] = part.thermal_conductivity;
          capacity[idx] = part.specific_heat;
          density[idx] = part.density;

          if (part.wind_speed !== 0) {
            uWind[idx] = part.wind_speed * Math.cos(part.wind_angle);
            vWind[idx] = part.wind_speed * Math.sin(part.wind_angle);
          }

          if (part.constant_temperature) {
            tb[idx] = part.temperature;
          }
        }
      }
    },

    refreshPowerArray = function () {
      var part, x, y, i, iny, j, k, len;
      for (i = 0; i < nx; i += 1) {
        x = i * delta_x;
        iny = i * ny;
        for (j = 0; j < ny; j += 1) {
          y = j * delta_y;
          q[iny + j] = 0;
          if (has_part_power) {
            for (k = 0, len = parts.length; k < len; k += 1) {
              part = parts[k];
              if (part.power !== 0 && part.shape.contains(x, y)) {
                // No overlap of parts will be allowed.
                q[iny + j] = part.getPower();
                break;
              }
            }
          }
        }
      }
    },

    //
    // Public API
    //
    core_model = {
      // !!!
      // Performs next step of a simulation.
      // !!!
      nextStep: function () {
        perf.start('Core model step');
        if (use_WebGL) {
          // GPU solvers.
          perf.start('Heat solver GPU');
          heat_solver_gpu.solve(opt.convective, t_tex, q_tex);
          perf.stop('Heat solver GPU');
          // Only heat solver is implemented at the moment.
        } else {
          // CPU solvers.
          if (radiative) {
            perf.start('Ray solver CPU');
            if (indexOfStep % opt.photon_emission_interval === 0) {
              refreshPowerArray();
              if (opt.sunny) {
                ray_solver.sunShine();
              }
              ray_solver.radiate();
            }
            ray_solver.solve();
            perf.stop('Ray solver CPU');
          }
          if (opt.convective) {
            perf.start('Fluid solver CPU');
            fluidSolver.solve(u, v);
            perf.stop('Fluid solver CPU');
          }
          perf.start('Heat solver CPU');
          heatSolver.solve(opt.convective, t, q);
          perf.stop('Heat solver CPU');
        }
        indexOfStep += 1;
        perf.stop('Core model step');
      },

      updateTemperatureArray: function () {
        if (use_WebGL) {
          perf.start('Read temperature texture');
          gpgpu.readTexture(t_tex, t);
          perf.stop('Read temperature texture');
        }
      },

      getIndexOfStep: function () {
        return indexOfStep;
      },
      // Returns loaded options after validation.
      getModelOptions: function () {
        return opt;
      },

      // Temperature manipulation.
      getTemperatureAt: function (x, y) {
        var
          i = Math.max(Math.min(nx - 1, Math.round(x / delta_x)), 0),
          j = Math.max(Math.min(ny - 1, Math.round(y / delta_y)), 0);

        return t[i * ny + j];
      },

      setTemperatureAt: function (x, y, temperature) {
        var
          i = Math.max(Math.min(nx - 1, Math.round(x / delta_x)), 0),
          j = Math.max(Math.min(ny - 1, Math.round(y / delta_y)), 0);

        t[i * ny + j] = temperature;
      },

      getAverageTemperatureAt: function (x, y) {
        var
          temp = 0,
          nx1 = nx - 1,
          ny1 = ny - 1,
          i0 = Math.round(x / delta_x),
          j0 = Math.round(y / delta_y),
          i, j;

        i = Math.max(Math.min(nx1, i0), 0);
        j = Math.max(Math.min(ny1, j0), 0);
        temp += t[i * ny + j];
        i = Math.max(Math.min(nx1, i0 + 1), 0);
        j = Math.max(Math.min(ny1, j0), 0);
        temp += t[i * ny + j];
        i = Math.max(Math.min(nx1, i0 - 1), 0);
        j = Math.max(Math.min(ny1, j0), 0);
        temp += t[i * ny + j];
        i = Math.max(Math.min(nx1, i0), 0);
        j = Math.max(Math.min(ny1, j0 + 1), 0);
        temp += t[i * ny + j];
        i = Math.max(Math.min(nx1, i0), 0);
        j = Math.max(Math.min(ny1, j0 - 1), 0);
        temp += t[i * ny + j];
        return temp * 0.2;
      },

      // TODO: based on Java version, check it as the logic seems to be weird.
      changeAverageTemperatureAt: function (x, y, increment) {
        var
          nx1 = nx - 1,
          ny1 = ny - 1,
          i0 = Math.round(x / delta_x),
          j0 = Math.round(y / delta_y),
          i, j;

        increment *= 0.2;
        i = Math.min(nx1, i0);
        j = Math.min(ny1, j0);
        if (i >= 0 && j >= 0) {
          t[i * ny + j] += increment;
        }
        i = Math.min(nx1, i0 + 1);
        j = Math.min(ny1, j0);
        if (i >= 0 && j >= 0) {
          t[i * ny + j] += increment;
        }
        i = Math.min(nx1, i0 - 1);
        j = Math.min(ny1, j0);
        if (i >= 0 && j >= 0) {
          t[i * ny + j] += increment;
        }
        i = Math.min(nx1, i0);
        j = Math.min(ny1, j0 + 1);
        if (i >= 0 && j >= 0) {
          t[i * ny + j] += increment;
        }
        i = Math.min(nx1, i0);
        j = Math.min(ny1, j0 - 1);
        if (i >= 0 && j >= 0) {
          t[i * ny + j] += increment;
        }
      },

      addPhoton: function (photon) {
        photons.push(photon);
      },

      removePhoton: function (photon) {
        var idx = photons.indexOf(photon);
        if (idx !== -1) {
          photons.splice(idx, 1);
        }
      },

      copyTextureToArray: function (tex, array) {
        gpgpu.readTexture(tex, array);
      },

      copyArrayToTexture: function (array, tex) {
        gpgpu.writeTexture(tex, array);
      },

      // Simple getters.
      getArrayType: function () {
        // return module variable
        return array_type;
      },
      getGridWidth: function () {
        return nx;
      },
      getGridHeight: function () {
        return ny;
      },
      getPerformanceModel: function () {
        return perf;
      },
      // Arrays.
      getTemperatureArray: function () {
        return t;
      },
      getUVelocityArray: function () {
        return u;
      },
      getVVelocityArray: function () {
        return v;
      },
      getUWindArray: function () {
        return uWind;
      },
      getVWindArray: function () {
        return vWind;
      },
      getBoundaryTemperatureArray: function () {
        return tb;
      },
      getPowerArray: function () {
        return q;
      },
      getConductivityArray: function () {
        return conductivity;
      },
      getCapacityArray: function () {
        return capacity;
      },
      getDensityArray: function () {
        return density;
      },
      getFluidityArray: function () {
        return fluidity;
      },
      getPhotonsArray: function () {
        return photons;
      },
      getPartsArray: function () {
        return parts;
      },
       // Textures.
      getTemperatureTexture: function () {
        return t_tex;
      },
      getUVelocityTexture: function () {
        return u_tex;
      },
      getVVelocityTexture: function () {
        return v_tex;
      },
      getUWindTexture: function () {
        return uWind_tex;
      },
      getVWindTexture: function () {
        return vWind_tex;
      },
      getBoundaryTemperatureTexture: function () {
        return tb_tex;
      },
      getPowerTexture: function () {
        return q_tex;
      },
      getConductivityTexture: function () {
        return conductivity_tex;
      },
      getCapacityTexture: function () {
        return capacity_tex;
      },
      getDensityTexture: function () {
        return density_tex;
      },
      getFluidityTexture: function () {
        return fluidity_tex;
      }
    };

  // 
  // One-off initialization.
  //

  // Setup optimization flags.
  radiative = (function () {
    var i, len;
    if (opt.sunny) {
      return true;
    }
    for (i = 0, len = parts.length; i < len; i += 1) {
      if (parts[i].emissivity > 0) {
        return true;
      }
    }
    return false;
  }());

  has_part_power = (function () {
    var i, len;
    for (i = 0, len = parts.length; i < len; i += 1) {
      if (parts[i].power > 0) {
        return true;
      }
    }
    return false;
  }());

  setupMaterialProperties();

  // CPU version of solvers.
  heatSolver = heatsolver.makeHeatSolver(core_model);
  fluidSolver = fluidsolver.makeFluidSolver(core_model);
  ray_solver = raysolver.makeRaySolver(core_model);

  if (use_WebGL) {
    initGPGPU();

    // GPU version of heat solver.
    heat_solver_gpu = heatsolver_GPU.makeHeatSolverGPU(core_model);
    // Update textures as material properties are set.
    updateAllTextures();
  }

  // Finally, return public API object.
  return core_model;
}