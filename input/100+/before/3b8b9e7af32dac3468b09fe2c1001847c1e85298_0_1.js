function () {
      var i, j, idx;

      // Init WebGL context.
      if (!gl.getExtension('OES_texture_float')) {
        throw new Error('This demo requires the OES_texture_float extension');
      }

      gl.canvas.width = 512;
      gl.canvas.height = 512;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.disable(gl.DEPTH_TEST);

      // Plane from -1 do 1 (x and y) with texture coordinates.
      plane = GL.Mesh.plane({ coords: true });
      // Two textures used for simple simulation. They have only one component (type: 32-bit float).
      textureA = new GL.Texture(TEX_WIDTH, TEX_HEIGHT, { type: gl.FLOAT, format: gl.LUMINANCE, filter: gl.NEAREST });
      textureB = new GL.Texture(TEX_WIDTH, TEX_HEIGHT, { type: gl.FLOAT, format: gl.LUMINANCE, filter: gl.NEAREST });
      // Texture used for reading data from GPU.
      outputTexture = new GL.Texture(TEX_WIDTH, TEX_HEIGHT, { type: gl.UNSIGNED_BYTE, format: gl.RGBA, filter: gl.NEAREST });
      outputStorage = new Uint8Array(TEX_WIDTH * TEX_HEIGHT * 4);

      // !!! Workaround for the bug: http://code.google.com/p/chromium/issues/detail?id=125481 !!!
      // lightgl.js sets this parameter to 1 during each GL.Texture call, so overwrite it when
      // all textures are created.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

      // Init data. Draw simple rectangle in the center.
      data = new Float32Array(TEX_WIDTH * TEX_HEIGHT);
      for (i = 0; i < TEX_HEIGHT; i += 1) {
        for (j = 0; j < TEX_WIDTH; j += 1) {
          idx = i * TEX_WIDTH + j;
          data[idx] = Math.random() * RANGE;
        }
      }
      // No need to initialize temp data now.
      dataTmp = new Float32Array(TEX_WIDTH * TEX_HEIGHT);

      writeTexture(textureA, data);
      
      // Stats.
      step = 0;
      renderTime = 0;
      cpuTime = 0;
      gpuTime = 0;
      readTime = 0;
    }