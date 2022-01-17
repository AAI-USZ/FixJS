function() {

        // Initial
        try {
          runIt([Migration.exec, Zoom.init, KeyEvent.init, Frame.register, CustomCode.runJS, CustomCode.loadCSS]);
        } catch (err) {
          logError(err)
        }
      }