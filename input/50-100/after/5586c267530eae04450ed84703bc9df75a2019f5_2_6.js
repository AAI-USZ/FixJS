function(messages) {
      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        if (message.delivery == 'sending') {
          if (tempTSList.indexOf(message.timestamp.getTime()) != -1) {
            ThreadUI.pendingDelList.push(message);
          }
        }
      }
    }