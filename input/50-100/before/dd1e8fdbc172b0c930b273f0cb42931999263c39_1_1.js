function() {
      if (controller) {
        try {
          controller.destroy();
          controller = null;
        } catch(e) {
          // could already be destroyed from the close
        }
      }
      window.scriptRun = null;
      delete window.scriptRun;
      testHelpers.teardown();
    }