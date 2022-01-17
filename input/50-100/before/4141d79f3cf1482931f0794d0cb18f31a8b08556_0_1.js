function() {




    // INject a lsitener for the backbutton, and tell native to override the flag (true/false) when we have 1 or more, or 0, listeners
    var backButtonChannel = cordova.addDocumentEventHandler('backbutton', {
      onSubscribe:function() {
        if (this.numHandlers === 1) {
            exec(null, null, "CoreEvents", "overridebackbutton", [true]);
        }
      },
      onUnsubscribe:function() {
        if (this.numHandlers === 0) {
          exec(null, null, "CoreEvents", "overridebackbutton", [false]);
        }
      }
    });
    }