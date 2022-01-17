function(verts, colors, texes, norms) {
      // we need to get each quad's vertices, but then transform them by the object's
      // local transformation, which includes the position offset and direction.
    
      var matrix;
      for (var i = 0; i < SIDES.length; i++)
      {
        var side = this[SIDES[i]], sdata = side.mesh.data;
        // use inverse transform to go from world space to object space, instead of the
        // opposite.
        var mvmatrix = side.camera.getTransformationMatrix(),
            nmatrix = side.camera.getNormalMatrix();
        for (var j = 0; j < sdata.length; j++) {
          var vofs = j * 3, tofs = j * 2, cofs = j * 4;
          
          _tmpvec3[0] = sdata.vertexBuffer[vofs];
          _tmpvec3[1] = sdata.vertexBuffer[vofs+1];
          _tmpvec3[2] = sdata.vertexBuffer[vofs+2];
          mat4.multiplyVec3(mvmatrix, _tmpvec3, _tmpvec3);
          verts.push(-_tmpvec3[0], -_tmpvec3[1], -_tmpvec3[2]);
          
          _tmpvec3[0] = sdata.normalBuffer[vofs];
          _tmpvec3[1] = sdata.normalBuffer[vofs+1];
          _tmpvec3[2] = sdata.normalBuffer[vofs+2];
          mat3.multiplyVec3(nmatrix, _tmpvec3, _tmpvec3);
          norms.push(_tmpvec3[0], _tmpvec3[1], _tmpvec3[2]);
          
          colors.push(sdata.colorBuffer[cofs], sdata.colorBuffer[cofs+1], sdata.colorBuffer[cofs+2], sdata.colorBuffer[cofs+3]);
          texes.push(sdata.textureCoordsBuffer[tofs], sdata.textureCoordsBuffer[tofs+1]);
        }
      }
    }