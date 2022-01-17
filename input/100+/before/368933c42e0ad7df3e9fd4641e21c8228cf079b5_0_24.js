function(x, y, width, height, tl, tr, br, bl) {
      if (tl !== undef) {
        throw "rect() with rounded corners is not supported in 3D mode";
      }

      if (curRectMode === PConstants.CORNERS) {
        width -= x;
        height -= y;
      } else if (curRectMode === PConstants.RADIUS) {
        width *= 2;
        height *= 2;
        x -= width / 2;
        y -= height / 2;
      } else if (curRectMode === PConstants.CENTER) {
        x -= width / 2;
        y -= height / 2;
      }

      // Modeling transformation
      var model = new PMatrix3D();
      model.translate(x, y, 0);
      model.scale(width, height, 1);
      model.transpose();

      // viewing transformation needs to have Y flipped
      // becuase that's what Processing does.
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      if (lineWidth > 0 && doStroke) {
        curContext.useProgram(programObject2D);
        uniformMatrix("model2d", programObject2D, "model", false, model.array());
        uniformMatrix("view2d", programObject2D, "view", false, view.array());
        uniformf("color2d", programObject2D, "color", strokeStyle);
        uniformi("picktype2d", programObject2D, "picktype", 0);
        vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, rectBuffer);
        disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");
        curContext.drawArrays(curContext.LINE_LOOP, 0, rectVerts.length / 3);
      }

      if (doFill) {
        curContext.useProgram(programObject3D);
        uniformMatrix("model3d", programObject3D, "model", false, model.array());
        uniformMatrix("view3d", programObject3D, "view", false, view.array());

        // fix stitching problems. (lines get occluded by triangles
        // since they share the same depth values). This is not entirely
        // working, but it's a start for drawing the outline. So
        // developers can start playing around with styles.
        curContext.enable(curContext.POLYGON_OFFSET_FILL);
        curContext.polygonOffset(1, 1);

        uniformf("color3d", programObject3D, "color", fillStyle);

        if(lightCount > 0){
          var v = new PMatrix3D();
          v.set(view);

          var m = new PMatrix3D();
          m.set(model);

          v.mult(m);

          var normalMatrix = new PMatrix3D();
          normalMatrix.set(v);
          normalMatrix.invert();
          normalMatrix.transpose();

          uniformMatrix("normalTransform3d", programObject3D, "normalTransform", false, normalMatrix.array());
          vertexAttribPointer("normal3d", programObject3D, "Normal", 3, rectNormBuffer);
        }
        else{
          disableVertexAttribPointer("normal3d", programObject3D, "Normal");
        }

        vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, rectBuffer);

        curContext.drawArrays(curContext.TRIANGLE_FAN, 0, rectVerts.length / 3);
        curContext.disable(curContext.POLYGON_OFFSET_FILL);
      }
    }