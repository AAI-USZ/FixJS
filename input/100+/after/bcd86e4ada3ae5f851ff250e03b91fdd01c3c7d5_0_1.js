function hiBack() {
      var message = {
        sender: number,
        receiver: null,
        delivery: 'received',
        body: 'Hi back! ' + text,
        id: messagesHack.length,
        timestamp: new Date()
      };

      var evt = {
        type: 'received',
        message: message
      };
      MessageManager.handleEvent.call(MessageManager, evt);
      // the SMS DB is written after the callback
      window.setTimeout(function writeDB() {
        messagesHack.unshift(message);
      }, 90 * Math.random());

    }