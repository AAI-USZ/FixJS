function onsave(msg) {
        if (!msg) {
          // TODO: We need to handle the pending message save failed.
          console.log('Message app - pending message save failed!');
          PendingMsgManager.saveToMsgDB(message, this);
        } else {
          // Clean Fields
          ThreadUI.cleanFields();
          // Update ThreadListUI when new message in pending database.
          if (window.location.hash == '#new') {
            window.location.hash = '#num=' + num;
          } else {
            // Append to DOM
            ThreadUI.appendMessage(message);
          }
          MessageManager.getMessages(ThreadListUI.renderThreads);
        }

      }