function(v1, v2, v3) {
      curContext.useProgram(programObject3D);
      uniformi("uUsingMat3d", programObject3D, "uUsingMat", true);
      var col = p.color(v1, v2, v3);
      uniformf("uMaterialAmbient3d", programObject3D, "uMaterialAmbient", p.color.toGLArray(col).slice(0, 3));
    }