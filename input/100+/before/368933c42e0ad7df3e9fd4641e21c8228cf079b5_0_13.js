function(left, right, bottom, top, near, far) {
      frustumMode = true;
      projection = new PMatrix3D();
      projection.set((2 * near) / (right - left), 0, (right + left) / (right - left),
                     0, 0, (2 * near) / (top - bottom), (top + bottom) / (top - bottom),
                     0, 0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near),
                     0, 0, -1, 0);
      var proj = new PMatrix3D();
      proj.set(projection);
      proj.transpose();
      curContext.useProgram(programObject2D);
      uniformMatrix("projection2d", programObject2D, "projection", false, proj.array());
      curContext.useProgram(programObject3D);
      uniformMatrix("projection3d", programObject3D, "projection", false, proj.array());
      curContext.useProgram(programObjectUnlitShape);
      uniformMatrix("uProjectionUS", programObjectUnlitShape, "uProjection", false, proj.array());
    }