function() {
      lightCount = 0;
      curContext.useProgram(programObject3D);
      uniformi("uLightCount3d", programObject3D, "uLightCount", lightCount);
    }