function(message, callback) {
    if (typeof(callback) != "undefined" && callback != null) {
      var cbID = new Date().getTime();
      while (cbID in Tapedeck.Backend.MessageHandler.sandboxCallbacks) {
        cbID = cbID + 1;
      }

      Tapedeck.Backend.MessageHandler.sandboxCallbacks[cbID] = callback;
      message.callbackID = cbID;
    }
    $("#sandbox").get(0).contentWindow.postMessage(message, "*");
  }