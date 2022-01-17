function () {
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
    }