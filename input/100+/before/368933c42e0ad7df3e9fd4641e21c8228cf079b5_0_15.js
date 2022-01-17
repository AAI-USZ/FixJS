function(w, h, d) {
      // user can uniformly scale the box by
      // passing in only one argument.
      if (!h || !d) {
        h = d = w;
      }

      // Modeling transformation
      var model = new PMatrix3D();
      model.scale(w, h, d);

      // viewing transformation needs to have Y flipped
      // becuase that's what Processing does.
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

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

        // Calculating the normal matrix can be expensive, so only
        // do it if it's necessary
        if(lightCount > 0){
          // Create the normal transformation matrix
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
          vertexAttribPointer("normal3d", programObject3D, "Normal", 3, boxNormBuffer);
        }
        else{
          disableVertexAttribPointer("normal3d", programObject3D, "Normal");
        }

        vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, boxBuffer);

        // Turn off per vertex colors
        disableVertexAttribPointer("aColor3d", programObject3D, "aColor");
        disableVertexAttribPointer("aTexture3d", programObject3D, "aTexture");

        curContext.drawArrays(curContext.TRIANGLES, 0, boxVerts.length / 3);
        curContext.disable(curContext.POLYGON_OFFSET_FILL);
      }

      if (lineWidth > 0 && doStroke) {
        curContext.useProgram(programObject2D);
        uniformMatrix("model2d", programObject2D, "model", false, model.array());
        uniformMatrix("view2d", programObject2D, "view", false, view.array());
        uniformf("color2d", programObject2D, "color", strokeStyle);
        uniformi("picktype2d", programObject2D, "picktype", 0);
        vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, boxOutlineBuffer);
        disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");
        curContext.drawArrays(curContext.LINES, 0, boxOutlineVerts.length / 3);
      }
    }