function () {
      // Make sure that environment is a browser.
      if (typeof window === 'undefined') {
        throw new Error("Core model: WebGL GPGPU unavailable in the node.js environment.");
      }
      // Request GPGPU utilities.
      gpgpu = energy2d.utils.gpu.gpgpu;
      // Init module.
      // Width is ny, height is nx (due to data organization).
      try {
        gpgpu.init(ny, nx);
      } catch (e) {
        // If WebGL initialization fails, just use CPU.
        use_WebGL = false;
        // TODO: inform better.
        console.warn("WebGL initialization failed. Energy2D will use CPU solvers.");
        return;
      }
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

      // GPU version of heat solver.
      heat_solver_gpu = heatsolver_GPU.makeHeatSolverGPU(core_model);
      // Update textures as material properties are set.
      updateAllTextures();
    }