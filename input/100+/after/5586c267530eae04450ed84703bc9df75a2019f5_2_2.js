function thlui_deleteAllThreads() {
    var response = window.confirm('Delete all conversations\n' +
                                  'Are you sure you want to do this?');
    if (response) {
      this.delNumList = [];
      this.pendingDelList = [];
      var inputs = this.view.querySelectorAll('input[type="checkbox"]');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].parentNode.parentNode.classList.add('undo-candidate');
      }
      // We get ALL the messages
      MessageManager.getMessages(function deleteAll(messages) {
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].delivery == 'sent' ||
           messages[i].delivery == 'received') {
            ThreadListUI.delNumList.push(messages[i].id);
          } else { //pending
            ThreadListUI.pendingDelList.push(messages[i]);
          }
        }
        ThreadListUI.executeDeletion();
      });
    }
  }