function thui_executeDeletion() {
    console.log("Del list = " + this.delNumList.length);
    console.log("Pending list = " + this.pendingDelList.length);
    if (this.delNumList.length > 0 || this.pendingDelList.length > 0) {
      var messagesInThread = this.view.querySelectorAll('input[type="checkbox"]');
      console.log("A borrar "+this.delNumList.length+this.pendingDelList+
                  " mensajes de un total de "+messagesInThread.length);
      var totalDelete = (this.delNumList.length + this.pendingDelList)
                           == messagesInThread.length;
      MessageManager.deleteMessages(this.delNumList, function reloadMessages() {
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
      });
    } else {
      window.history.go(-1);
    }
  }