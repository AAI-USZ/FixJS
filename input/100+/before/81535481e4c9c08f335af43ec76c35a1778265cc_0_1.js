function () {
      var uniforms;

      if (boundary.temperature_at_border) {
        uniforms = {
          grid: grid_vec,
          flux: 0.0,
          vN: boundary.temperature_at_border.upper,
          vS:  boundary.temperature_at_border.lower,
          vW:  boundary.temperature_at_border.left,
          vE:  boundary.temperature_at_border.right
        };
      } else if (boundary.flux_at_border) {
        uniforms = {
          grid: grid_vec,
          flux: 1.0,
          vN: boundary.flux_at_border.upper,
          vS: boundary.flux_at_border.lower,
          vW: boundary.flux_at_border.left,
          vE: boundary.flux_at_border.right,
          delta_x: delta_x,
          delta_y: delta_y
        };
      }
      apply_boundary_program.uniforms(uniforms);

      // Solve program uniforms.
      uniforms = {
        grid: grid_vec,
        hx: 0.5 / (delta_x * delta_x),
        hy: 0.5 / (delta_y * delta_y),
        inv_timestep: 1.0 / timestep,
        // Texture units.
        data1: 0,
        data2: 1
      };

      solve_program.uniforms(uniforms);
    }