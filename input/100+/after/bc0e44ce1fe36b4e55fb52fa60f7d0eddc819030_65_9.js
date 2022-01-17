function onsent(msg) {
        if (!msg) {
          var resendConfirmStr = _('resendConfirmDialogMsg');
          var result = confirm(resendConfirmStr);
          if (!result) {
            // Remove the message from pending message DB before resend.
            PendingMsgManager.deleteFromMsgDB(message, function ondelete(msg) {
              var filter = MessageManager.createFilter(num);
              MessageManager.getMessages(function(messages) {
                if (messages.length > 0) {
                  ThreadUI.renderMessages(messages);
                  MessageManager.getMessages(ThreadListUI.renderThreads);
                } else {
                  MessageManager.getMessages(ThreadListUI.renderThreads,
                                             null, null, function() {
                    window.location.hash = '#thread-list';
                  });

                }
              }, filter, true);
            });
            window.setTimeout(self.sendMessage.bind(self), 500);
            return;
          } else {
            // TODO We found that there is no resend!
            // Steve, could you take a look?!
          }
        } else {
          var root = document.getElementById(message.timestamp.getTime());
          if (root) {

            root.removeChild(root.childNodes[1]);
            var inputs = root.querySelectorAll('input[type="checkbox"]');
            if (inputs) {
              inputs[0].value = 'id_' + msg.id;
            }

          }


          // Remove the message from pending message DB since it could be sent
          // successfully.
          PendingMsgManager.deleteFromMsgDB(message, function ondelete(msg) {
            if (!msg) {
              //TODO: Handle message delete failed in pending DB.
            }
          });
        }
      }