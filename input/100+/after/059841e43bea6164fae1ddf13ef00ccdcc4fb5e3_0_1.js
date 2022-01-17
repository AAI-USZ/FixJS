function () {
      var dataGPU, i, len;
      // Init WebGL context.
      if (!gl.getExtension('OES_texture_float')) {
        throw new Error('This sddemo requires the OES_texture_float extension');
      }

      gl.canvas.width = 512;
      gl.canvas.height = 512;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.disable(gl.DEPTH_TEST);

      // Plane from -1 do 1 (x and y) with texture coordinates.
      plane = GL.Mesh.plane({ coords: true });
      // Two textures used for simple simulation. 
      // Do not use only single component textures (ALPHA/LUMINANCE), as they cause problems on some GPUs 
      // (when used as render targets).
      textureA = new GL.Texture(TEX_WIDTH, TEX_HEIGHT, { type: gl.FLOAT, format: gl.RGBA, filter: gl.NEAREST });
      textureB = new GL.Texture(TEX_WIDTH, TEX_HEIGHT, { type: gl.FLOAT, format: gl.RGBA, filter: gl.NEAREST });
      // Texture used for reading data from GPU.
      outputTexture = new GL.Texture(TEX_WIDTH, TEX_HEIGHT, { type: gl.UNSIGNED_BYTE, format: gl.RGBA, filter: gl.NEAREST });
      outputStorage = new Uint8Array(TEX_WIDTH * TEX_HEIGHT * 4);

      // !!! Workaround for the bug: http://code.google.com/p/chromium/issues/detail?id=125481 !!!
      // lightgl.js sets this parameter to 1 during each GL.Texture call, so overwrite it when
      // all textures are created.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

      // Init data. Draw simple rectangle in the center.
      data = new Float32Array(TEX_WIDTH * TEX_HEIGHT);
      dataGPU = new Float32Array(TEX_WIDTH * TEX_HEIGHT * 4);
      for (i = 0, len = TEX_WIDTH * TEX_HEIGHT; i < len; i += 1) {
        data[i] = Math.random() * RANGE;
        dataGPU[4 * i] = data[i];
        dataGPU[4 * i + 1] = 0;
        dataGPU[4 * i + 2] = 0;
        dataGPU[4 * i + 3] = 0;
      }
      // No need to initialize temp data now.
      dataTmp = new Float32Array(TEX_WIDTH * TEX_HEIGHT);

      writeTexture(textureA, dataGPU);
      
      // Stats.
      step = 0;
      renderTime = 0;
      cpuTime = 0;
      gpuTime = 0;
      readTime = 0;
    }