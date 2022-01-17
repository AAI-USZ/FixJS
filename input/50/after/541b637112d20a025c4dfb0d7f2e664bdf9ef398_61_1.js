function onMessage(message) {
        if (false === next(raw ? message : message.json) && listener) {
          messageManager.removeMessageListener(address, listener);
          listener = null;
        }
      }