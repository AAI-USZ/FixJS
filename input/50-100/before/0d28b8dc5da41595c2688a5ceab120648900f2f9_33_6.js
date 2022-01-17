function onsave(msg) {
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

      }