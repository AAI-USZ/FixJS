function(which) {
      var curContext = drawing.$ensureContext();
      if (which === PConstants.DISABLE_DEPTH_TEST) {
         curContext.disable(curContext.DEPTH_TEST);
         curContext.depthMask(false);
         curContext.clear(curContext.DEPTH_BUFFER_BIT);
      }
      else if (which === PConstants.ENABLE_DEPTH_TEST) {
         curContext.enable(curContext.DEPTH_TEST);
         curContext.depthMask(true);
      }
      else if (which === PConstants.ENABLE_OPENGL_2X_SMOOTH ||
               which === PConstants.ENABLE_OPENGL_4X_SMOOTH){
        renderSmooth = true;
      }
      else if (which === PConstants.DISABLE_OPENGL_2X_SMOOTH){
        renderSmooth = false;
      }
    }