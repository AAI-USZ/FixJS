function() {
      lightCount = 0;
      curContext.useProgram(programObject3D);
      uniformi("lightCount3d", programObject3D, "lightCount", lightCount);
    }