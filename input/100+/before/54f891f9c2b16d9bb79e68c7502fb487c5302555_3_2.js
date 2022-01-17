function(subject, data, callback) {
      var messageId, payload;
      if (callback == null) {
        callback = null;
      }
      if (this.sockets.length === 0) {
        if (callback) {
          callback({
            error: ERR_REQ_REFUSED
          });
        }
        return;
      }
      if (!this.sockets[this.socketIterator]) {
        this.socketIterator = 0;
      }
      if (callback) {
        messageId = this.generateUniqueId();
        this.waiters[messageId] = callback;
      }
      payload = this.prepareJsonToSend({
        id: messageId,
        subject: subject,
        data: data
      });
      return this.sockets[this.socketIterator++].write(payload);
    }