function ondelete(msg) {
              if (!msg) {
                //TODO: Handle message delete failed in pending DB.
                return;
              }
              var filter = MessageManager.createFilter(num);
              MessageManager.getMessages(ThreadUI.renderMessages, filter, true);
            }