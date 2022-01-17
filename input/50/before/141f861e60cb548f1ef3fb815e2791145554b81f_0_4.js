function(shine) {
      curContext.useProgram(programObject3D);
      uniformi("usingMat3d", programObject3D, "usingMat", true);
      uniformf("shininess3d", programObject3D, "shininess", shine);
    }