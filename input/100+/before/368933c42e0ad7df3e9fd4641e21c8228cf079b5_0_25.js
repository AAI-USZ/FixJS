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
    }