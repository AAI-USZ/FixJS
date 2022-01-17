function(constant, linear, quadratic) {
      curContext.useProgram(programObject3D);
      uniformf("falloff3d", programObject3D, "falloff", [constant, linear, quadratic]);
    }