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
      uniformMatrix("model2d", programObject2D, "model", false, model.array());
      uniformMatrix("view2d", programObject2D, "view", false, view.array());

      if (lineWidth > 0 && doStroke) {
        // this will be replaced with the new bit shifting color code
        uniformf("color2d", programObject2D, "color", strokeStyle);
        uniformi("picktype2d", programObject2D, "picktype", 0);
        vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, pointBuffer);
        disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");
        curContext.drawArrays(curContext.POINTS, 0, 1);
      }
    }