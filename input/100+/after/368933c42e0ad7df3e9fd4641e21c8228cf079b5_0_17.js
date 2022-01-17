function(x, y, z) {
      var model = new PMatrix3D();

      // move point to position
      model.translate(x, y, z || 0);
      model.transpose();

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      curContext.useProgram(programObject2D);
      uniformMatrix("uModel2d", programObject2D, "uModel", false, model.array());
      uniformMatrix("uView2d", programObject2D, "uView", false, view.array());

      if (lineWidth > 0 && doStroke) {
        // this will be replaced with the new bit shifting color code
        uniformf("uColor2d", programObject2D, "uColor", strokeStyle);
        uniformi("uIsDrawingText2d", programObject2D, "uIsDrawingText", false);
        uniformi("uSmooth2d", programObject2D, "uSmooth", renderSmooth);
        vertexAttribPointer("aVertex2d", programObject2D, "aVertex", 3, pointBuffer);
        disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");
        curContext.drawArrays(curContext.POINTS, 0, 1);
      }
    }