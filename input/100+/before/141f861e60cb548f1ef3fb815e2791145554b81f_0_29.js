function(vArray, mode, cArray, tArray){
      var ctxMode;
      if (mode === "TRIANGLES") {
        ctxMode = curContext.TRIANGLES;
      } else if(mode === "TRIANGLE_FAN") {
        ctxMode = curContext.TRIANGLE_FAN;
      } else {
        ctxMode = curContext.TRIANGLE_STRIP;
      }

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      curContext.useProgram( programObject3D );
      uniformMatrix("model3d", programObject3D, "model", false,  [1,0,0,0,  0,1,0,0,   0,0,1,0,   0,0,0,1] );
      uniformMatrix("view3d", programObject3D, "view", false, view.array() );
      curContext.enable( curContext.POLYGON_OFFSET_FILL );
      curContext.polygonOffset( 1, 1 );
      uniformf("color3d", programObject3D, "color", [-1,0,0,0]);
      vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, fillBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(vArray), curContext.STREAM_DRAW);

      // if we are using a texture and a tint, then overwrite the
      // contents of the color buffer with the current tint
      if (usingTexture && curTint !== null){
        curTint3d(cArray);
      }

      vertexAttribPointer("aColor3d", programObject3D, "aColor", 4, fillColorBuffer);
      curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(cArray), curContext.STREAM_DRAW);

      // No support for lights....yet
      disableVertexAttribPointer("normal3d", programObject3D, "Normal");

      if (usingTexture) {
        uniformi("usingTexture3d", programObject3D, "usingTexture", usingTexture);
        vertexAttribPointer("aTexture3d", programObject3D, "aTexture", 2, shapeTexVBO);
        curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(tArray), curContext.STREAM_DRAW);
      }

      curContext.drawArrays( ctxMode, 0, vArray.length/3 );
      curContext.disable( curContext.POLYGON_OFFSET_FILL );
    }