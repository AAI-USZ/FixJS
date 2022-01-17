function(data) {
      var adjustedLD, lighting, lightingDirection;
      gl.bindBuffer(gl.ARRAY_BUFFER, data.vertexPositionBuffer);
      gl.vertexAttribPointer(gl.shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, data.vertexNormalBuffer);
      gl.vertexAttribPointer(gl.shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, data.vertexTextureCoordBuffer);
      gl.vertexAttribPointer(gl.shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.crateTexture);
      gl.uniform1i(gl.shaderProgram.samplerUniform, 0);
      lighting = true;
      gl.uniform1i(gl.shaderProgram.useLightingUniform, lighting);
      if (lighting) {
        gl.uniform3f(gl.shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2);
        lightingDirection = [-0.25, -0.25, -1.0];
        adjustedLD = vec3.create();
        vec3.normalize(lightingDirection, adjustedLD);
        vec3.scale(adjustedLD, -1);
        gl.uniform3fv(gl.shaderProgram.lightingDirectionUniform, adjustedLD);
        gl.uniform3f(gl.shaderProgram.directionalColorUniform, 0.8, 0.8, 0.8);
      }
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, data.vertexIndexBuffer);
      gl.setMatrixUniforms();
      return gl.drawElements(gl.TRIANGLES, data.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    }