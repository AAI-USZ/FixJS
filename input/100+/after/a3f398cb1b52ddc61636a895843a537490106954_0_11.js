function() {
        //TODO Change this functionality with Steve code
        if (ThreadUI.pendingDelList.length > 0) {
          for (var i = 0; i < ThreadUI.pendingDelList.length; i++) {
            if (i == ThreadUI.pendingDelList.length - 1) {
              // Once everything is removed
              PendingMsgManager.deleteFromMsgDB(ThreadUI.pendingDelList[i],
                function() {
                  var filter = MessageManager.createFilter(
                    MessageManager.currentNum);
                  MessageManager.getMessages(function(messages) {
                    if(messages.length>0){
                      // If there are messages yet
                      ThreadUI.renderMessages(messages);
                      window.history.back();
                    }else{
                      // If there is no more messages (delete all)
                      ThreadUI.view.innerHTML = '';
                      MessageManager.getMessages(ThreadListUI.renderThreads,null,null, function(){
                        var mainWrapper = document.getElementById('main-wrapper');
                        mainWrapper.classList.remove('edit');
                        window.location.hash ='#thread-list';
                      });
                      
                    }
                },filter);
              });
            } else {
              PendingMsgManager.deleteFromMsgDB(ThreadUI.pendingDelList[i]);
            }
          }
        }else{
          var filter = MessageManager.createFilter(MessageManager.currentNum);
          MessageManager.getMessages(function recoverMessages(messages) {
            if(messages.length>0){
              ThreadUI.renderMessages(messages);
              window.history.back();
            }else{
              ThreadUI.view.innerHTML = '';
              MessageManager.getMessages(ThreadListUI.renderThreads,null,null, function(){
                var mainWrapper = document.getElementById('main-wrapper');
                mainWrapper.classList.remove('edit');
                window.location.hash ='#thread-list';
              });
              
            }
            
          },filter);
        }
      
      }