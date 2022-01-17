function(v1, v2, v3) {
      curContext.useProgram(programObject3D);
      uniformi("usingMat3d", programObject3D, "usingMat", true);
      var col = p.color(v1, v2, v3);
      uniformf("mat_specular3d", programObject3D, "mat_specular", p.color.toGLArray(col).slice(0, 3));
    }