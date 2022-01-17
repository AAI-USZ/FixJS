function (convective, t_tex, q_tex) {
      var
        uniforms = {
          grid: grid_vec,
          hx: 0.5 / (delta_x * delta_x),
          hy: 0.5 / (delta_y * delta_y),
          inv_timestep: 1.0 / timestep,
          // Texture units.
          t: 0,
          t0: 1,
          tb: 2,
          q: 3,
          capacity: 4,
          density: 5,
          conductivity: 6
        },
        // Textures. 
        // Their order have to match texture units declaration above!
        textures = [
          t_tex,
          t0_tex,
          tb_tex,
          q_tex,
          capacity_tex,
          density_tex,
          conductivity_tex
        ],
        k;

      // Store previous values.
      gpgpu.copyTexture(t_tex, t0_tex);

      for (k = 0; k < relaxation_steps; k += 1) {
        gpgpu.executeProgram(
          solve_program,
          textures,
          uniforms,
          t_tex
        );

        applyBoundary(t_tex);
      }
    }