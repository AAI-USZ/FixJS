function (doc) {
        if (bridge.docLoadListeners[doc.defaultView]) {
          bridge.docLoadListeners[doc.defaultView]();
        }
      }