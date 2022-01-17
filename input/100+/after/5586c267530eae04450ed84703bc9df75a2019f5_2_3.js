function thlui_deleteThreads() {
    this.delNumList = []; //clean the lists before adding stuff
    this.pendingDelList = [];
    var inputs = this.view.querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].parentNode.parentNode.classList.add('undo-candidate');
      var filter = MessageManager.createFilter(inputs[i].value);
      MessageManager.getMessages(function gotMessages(messages) {
        for (var j = 0; j < messages.length; j++) {
          if (messages[j].delivery == 'sent' ||
              messages[j].delivery == 'received') {
            ThreadListUI.delNumList.push(parseFloat(messages[j].id));
          } else {
            ThreadListUI.pendingDelList.push(messages[j]);
          }
        }
      }, filter);
    }
  }