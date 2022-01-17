function thui_sendMessage() {
    // Retrieve num depending on hash
    var hash = window.location.hash;
    // Depending where we are, we get different num
    if (hash == '#new') {
      var num = this.num.value;
    } else {
      var num = MessageManager.getNumFromHash();
    }
    // Retrieve text
    var text = this.input.value;
    // If we have something to send
    if (num != '' && text != '') {
      // Create 'PendingMessage'
      var tempDate = new Date();
      var message = {
        sender: null,
        receiver: num,
        delivery: 'sending',
        body: text,
        read: 1,
        timestamp: tempDate
      };
      // Append to DOM
      this.appendMessage(message);

      // Clean Fields
      ThreadUI.cleanFields();

      var self = this;
      // Save the message into pendind DB before send.
      PendingMsgManager.saveToMsgDB(message, function onsave(msg) {
        if (!msg) {
          // TODO: We need to handle the pending message save failed.
          console.log('Message app - pending message save failed!');
          PendingMsgManager.saveToMsgDB(message, this);
        }
        // Update ThreadListUI when new message in pending database.
        if (window.location.hash == '#new') {
          window.location.hash = '#num=' + num;
        }
        MessageManager.getMessages(ThreadListUI.renderThreads);

      });

      MessageManager.send(num, text, function onsent(msg) {
        if (!msg) {
          var resendConfirmStr = _('resendConfirmDialogMsg');
          var result = confirm(resendConfirmStr);
          if (result) {
            // Remove the message from pending message DB before resend.
            PendingMsgManager.deleteFromMsgDB(message, function ondelete(msg) {
              if (!msg) {
                //TODO: Handle message delete failed in pending DB.
                return;
              }
              var filter = MessageManager.createFilter(num);
              MessageManager.getMessages(ThreadUI.renderMessages, filter, true);
            });
            window.setTimeout(self.sendMessage.bind(self), 500);
            return;
          }
        } else {
          var root = document.getElementById(message.timestamp.getTime());
          root.removeChild(root.childNodes[1]);
          // Remove the message from pending message DB since it could be sent
          // successfully.
          PendingMsgManager.deleteFromMsgDB(message, function ondelete(msg) {
            if (!msg) {
              //TODO: Handle message delete failed in pending DB.
            }
          });
          // TODO: We might need to update the sent message's actual timestamp.
        }
      });
    }
  }