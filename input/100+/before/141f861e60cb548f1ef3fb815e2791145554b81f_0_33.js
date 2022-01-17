function(x1, y1, z1, x2, y2, z2) {
      if (y2 === undef || z2 === undef) { // 2D line called in 3D context
        z2 = 0;
        y2 = x2;
        x2 = z1;
        z1 = 0;
      }

      // a line is only defined if it has different start and end coordinates.
      // If they are the same, we call point instead.
      if (x1===x2 && y1===y2 && z1===z2) {
        p.point(x1,y1,z1);
        return;
      }

      var lineVerts = [x1, y1, z1, x2, y2, z2];

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      if (lineWidth > 0 && doStroke) {
        curContext.useProgram(programObject2D);

        uniformMatrix("model2d", programObject2D, "model", false, [1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1]);
        uniformMatrix("view2d", programObject2D, "view", false, view.array());

        uniformf("color2d", programObject2D, "color", strokeStyle);
        uniformi("picktype2d", programObject2D, "picktype", 0);

        vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, lineBuffer);
        disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");

        curContext.bufferData(curContext.ARRAY_BUFFER, new Float32Array(lineVerts), curContext.STREAM_DRAW);
        curContext.drawArrays(curContext.LINES, 0, 2);
      }
    }