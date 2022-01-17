function repaint() {
      for (var i = 0; i < ThreadListUI.pendingDelList.length; i++) {
        //TODO Change this functionality with Steve code
        if (i == ThreadListUI.pendingDelList.length -1) {
          PendingMsgManager.deleteFromMsgDB(ThreadListUI.pendingDelList[i], function() {
            MessageManager.getMessages(function recoverMessages(messages) {
              ThreadListUI.renderThreads(messages);
              window.location.hash = '#thread-list';
            });
          });
        } else {
          PendingMsgManager.deleteFromMsgDB(ThreadListUI.pendingDelList[i]);
        }
      }
      
    }