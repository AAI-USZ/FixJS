function() {
      var sRad = arguments[0];

      if ((sphereDetailU < 3) || (sphereDetailV < 2)) {
        p.sphereDetail(30);
      }

      // Modeling transformation
      var model = new PMatrix3D();
      model.scale(sRad, sRad, sRad);

      // viewing transformation needs to have Y flipped
      // becuase that's what Processing does.
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      if (doFill) {
        // Calculating the normal matrix can be expensive, so only
        // do it if it's necessary
        if(lightCount > 0){
          // Create a normal transformation matrix
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
          vertexAttribPointer("normal3d", programObject3D, "Normal", 3, sphereBuffer);
        }
        else{
          disableVertexAttribPointer("normal3d", programObject3D, "Normal");
        }

        curContext.useProgram(programObject3D);
        disableVertexAttribPointer("aTexture3d", programObject3D, "aTexture");

        uniformMatrix("model3d", programObject3D, "model", false, model.array());
        uniformMatrix("view3d", programObject3D, "view", false, view.array());
        vertexAttribPointer("vertex3d", programObject3D, "Vertex", 3, sphereBuffer);

        // Turn off per vertex colors
        disableVertexAttribPointer("aColor3d", programObject3D, "aColor");

        // fix stitching problems. (lines get occluded by triangles
        // since they share the same depth values). This is not entirely
        // working, but it's a start for drawing the outline. So
        // developers can start playing around with styles.
        curContext.enable(curContext.POLYGON_OFFSET_FILL);
        curContext.polygonOffset(1, 1);
        uniformf("color3d", programObject3D, "color", fillStyle);
        curContext.drawArrays(curContext.TRIANGLE_STRIP, 0, sphereVerts.length / 3);
        curContext.disable(curContext.POLYGON_OFFSET_FILL);
      }

      if (lineWidth > 0 && doStroke) {
        curContext.useProgram(programObject2D);
        uniformMatrix("model2d", programObject2D, "model", false, model.array());
        uniformMatrix("view2d", programObject2D, "view", false, view.array());
        vertexAttribPointer("vertex2d", programObject2D, "Vertex", 3, sphereBuffer);
        disableVertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord");
        uniformf("color2d", programObject2D, "color", strokeStyle);
        uniformi("picktype2d", programObject2D, "picktype", 0);
        curContext.drawArrays(curContext.LINE_STRIP, 0, sphereVerts.length / 3);
      }
    }