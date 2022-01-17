function () {
      var uniforms;

      // Solver program uniforms.
      uniforms = {
        grid: grid_vec,
        enforce_temp: 0.0,
        hx: 0.5 / (delta_x * delta_x),
        hy: 0.5 / (delta_y * delta_y),
        inv_timestep: 1.0 / timestep,
        // Texture units.
        data1: 0,
        data2: 1
      };
      solve_program.uniforms(uniforms);

      if (boundary.temperature_at_border) {
        uniforms = {
          grid: grid_vec,
          enforce_temp: 1.0,
          vN:  boundary.temperature_at_border.upper,
          vS:  boundary.temperature_at_border.lower,
          vW:  boundary.temperature_at_border.left,
          vE:  boundary.temperature_at_border.right
        };
        // Integrate boundary conditions with solver program.
        // This is optimization that allows to limit render-to-texture calls.
        solve_program.uniforms(uniforms);
      } else if (boundary.flux_at_border) {
        uniforms = {
          grid: grid_vec,
          vN: boundary.flux_at_border.upper,
          vS: boundary.flux_at_border.lower,
          vW: boundary.flux_at_border.left,
          vE: boundary.flux_at_border.right,
          delta_x: delta_x,
          delta_y: delta_y
        };
        // Flux boundary conditions can't be integrated into solver program.
        apply_boundary_program.uniforms(uniforms);
      }
    }