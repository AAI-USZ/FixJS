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
      view.scale( 1, -1, 1 );
      view.apply( modelView.array() );
      view.transpose();

      curContext.useProgram( programObject3D );
      uniformMatrix( "model3d", programObject3D, "uModel", false,  [1,0,0,0,  0,1,0,0,   0,0,1,0,   0,0,0,1] );
      uniformMatrix( "view3d", programObject3D, "uView", false, view.array() );
      curContext.enable( curContext.POLYGON_OFFSET_FILL );
      curContext.polygonOffset( 1, 1 );
      uniformf( "color3d", programObject3D, "uColor", [-1,0,0,0] );
      vertexAttribPointer( "vertex3d", programObject3D, "aVertex", 3, fillBuffer );
      curContext.bufferData( curContext.ARRAY_BUFFER, new Float32Array(vArray), curContext.STREAM_DRAW );

      // if we are using a texture and a tint, then overwrite the
      // contents of the color buffer with the current tint
      if ( usingTexture && curTint !== null ){
        curTint3d( cArray );
      }

      vertexAttribPointer( "aColor3d", programObject3D, "aColor", 4, fillColorBuffer );
      curContext.bufferData( curContext.ARRAY_BUFFER, new Float32Array(cArray), curContext.STREAM_DRAW );

      // No support for lights....yet
      disableVertexAttribPointer( "aNormal3d", programObject3D, "aNormal" );

      if ( usingTexture ) {
        uniformi( "uUsingTexture3d", programObject3D, "uUsingTexture", usingTexture );
        vertexAttribPointer( "aTexture3d", programObject3D, "aTexture", 2, shapeTexVBO );
        curContext.bufferData( curContext.ARRAY_BUFFER, new Float32Array(tArray), curContext.STREAM_DRAW );
      }

      curContext.drawArrays( ctxMode, 0, vArray.length/3 );
      curContext.disable( curContext.POLYGON_OFFSET_FILL );
    }