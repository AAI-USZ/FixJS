function setProgramState(vertex_positions, vertex_colours, vertex_coords, textureinfo, tex_gen_enabled) {

    var cycle_type = getCycleType();
    if (cycle_type < cycleTypeValues.G_CYC_COPY) {
      initBlend();
    } else {
      gl.disable(gl.BLEND);
    }

    var program = getCurrentShaderProgram(cycle_type);
    gl.useProgram(program);

    var vertexPositionAttribute = gl.getAttribLocation(program,  "aVertexPosition");
    var vertexColorAttribute    = gl.getAttribLocation(program,  "aVertexColor");
    var texCoordAttribute       = gl.getAttribLocation(program,  "aTextureCoord");
    var uSamplerUniform         = gl.getUniformLocation(program, "uSampler");
    var uPrimColorUniform       = gl.getUniformLocation(program, "uPrimColor");
    var uEnvColorUniform        = gl.getUniformLocation(program, "uEnvColor");
    var uTexScaleUniform        = gl.getUniformLocation(program, "uTexScale");
    var uTexOffsetUniform       = gl.getUniformLocation(program, "uTexOffset");

    // aVertexPosition
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, n64PositionsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexPositionAttribute, 4, gl.FLOAT, false, 0, 0);

    // aVertexColor
    gl.enableVertexAttribArray(vertexColorAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, n64ColorsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Uint32Array(vertex_colours), gl.STATIC_DRAW);
    gl.vertexAttribPointer(vertexColorAttribute, 4, gl.UNSIGNED_BYTE, true, 0, 0);

    // aTextureCoord
    gl.enableVertexAttribArray(texCoordAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, n64UVBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_coords), gl.STATIC_DRAW);
    gl.vertexAttribPointer(texCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    // uSampler
    if (textureinfo) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureinfo.texture);
      gl.uniform1i(uSamplerUniform, 0);

      var uv_offset_u = textureinfo.left;
      var uv_offset_v = textureinfo.top;
      var uv_scale_u = 1.0 / textureinfo.nativeWidth;
      var uv_scale_v = 1.0 / textureinfo.nativeHeight;

      // Horrible hack for wetrix. For some reason uvs come out 2x what they should be. Current guess is that it's getting G_TX_CLAMP with a shift of 0 which is causing this
      if (textureinfo.width === 56 && textureinfo.height === 29) {
        uv_scale_u *= 0.5;
        uv_scale_v *= 0.5;
      }

      // When texture coordinates are generated, they're already correctly scaled. Maybe they should be generated in this coord space?
      if (tex_gen_enabled) {
        uv_scale_u  = 1;
        uv_scale_v  = 1;
        uv_offset_u = 0;
        uv_offset_v = 0;
      }

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textureinfo.texture);
      gl.uniform1i(uSamplerUniform, 0);

      gl.uniform2f(uTexScaleUniform,  uv_scale_u,  uv_scale_v );
      gl.uniform2f(uTexOffsetUniform, uv_offset_u, uv_offset_u );

      if (getTextureFilterType() == textureFilterValues.G_TF_POINT) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
      } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      }
    }

    gl.uniform4f(uPrimColorUniform, ((state.primColor>>>24)&0xff)/255.0,  ((state.primColor>>>16)&0xff)/255.0, ((state.primColor>>> 8)&0xff)/255.0, ((state.primColor>>> 0)&0xff)/255.0 );
    gl.uniform4f(uEnvColorUniform,  ((state.envColor >>>24)&0xff)/255.0,  ((state.envColor >>>16)&0xff)/255.0, ((state.envColor >>> 8)&0xff)/255.0, ((state.envColor >>> 0)&0xff)/255.0 );

  }