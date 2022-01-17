function (win) {
        if (bridge.docLoadListeners[win]) {
          bridge.docLoadListeners[win]();
        }
      }