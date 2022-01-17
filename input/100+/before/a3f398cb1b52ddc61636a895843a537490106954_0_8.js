function reloadMessages() {
        window.alert("woooop");
        for (var i = 0; i < pendingDelList.length; i++) {
          console.log("Borrando el pending n"+i);
          PendingMsgManager.deleteFromMsgDB(pendingDelList[i]);
          if (i == (pendingDelList.length -1))
              window.alert("NO MAS PENDING");
        }
        MessageManager.getMessages(ThreadListUI.renderThreads, null, null,
                                   function goBack() {
          if (totalDelete){
            document.getElementById('main-wrapper').classList.remove('edit');
            window.location.hash = '#thread-list'
            console.log("jump a threads");
          } else {
            window.history.go(-1);
            console.log("jump al anterior");
          }
        });
      }