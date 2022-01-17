function input(next, stop) {
      let listener = messageListener(scope, function onMessage(message) {
        if (false === next(raw ? message : message.json) && listener) {
          messageManager.removeMessageListener(address, listener);
          listener = null;
        }
      });
      messageManager.addMessageListener(address, listener);

      // Bug 724433: do not leak `listener` on addon disabling
      when(function () {
        if (listener) {
          messageManager.removeMessageListener(address, listener);
          listener = null;
        }
      });
    }