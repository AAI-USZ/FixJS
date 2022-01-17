function() {
      if (controller) {
        try {
          controller.destroy();
          controller = null;
        } catch(e) {
          // could already be destroyed from the close
        }
      }
      try {
        var und;
        window.scriptRun = und;
        delete window.scriptRun;
      } catch(e) { /* IE8 blows up trying to delete scriptRun */ }

      testHelpers.teardown();
    }