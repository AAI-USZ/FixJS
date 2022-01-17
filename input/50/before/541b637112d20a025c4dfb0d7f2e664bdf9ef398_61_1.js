function onMessage(message) {
        if (false === next(raw ? message : message.json))
          messageManager.removeMessageListener(address, listener);
      }