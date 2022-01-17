function repaint() {
      //TODO Change this functionality with Steve code
      //TODO Steve will add delete pending in deleteMessages!
      if (ThreadListUI.pendingDelList.length > 0) {
        for (var i = 0; i < ThreadListUI.pendingDelList.length; i++) {
          if (i == ThreadListUI.pendingDelList.length - 1) {
            PendingMsgManager.deleteFromMsgDB(ThreadListUI.pendingDelList[i],
              function() {
              MessageManager.getMessages(function recoverMessages(messages) {
                ThreadListUI.renderThreads(messages);
                window.location.hash = '#thread-list';
              });
            });
          } else {
            PendingMsgManager.deleteFromMsgDB(ThreadListUI.pendingDelList[i]);
          }
        }
      } else {
        MessageManager.getMessages(function recoverMessages(messages) {
          ThreadListUI.renderThreads(messages);
          window.location.hash = '#thread-list';
        });
      }
    }