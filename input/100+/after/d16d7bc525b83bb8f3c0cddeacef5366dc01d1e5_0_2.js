function thlui_deleteThreads() {
    var inputs = this.view.querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].parentNode.parentNode.classList.add('undo-candidate');
      var filter = MessageManager.createFilter(inputs[i].name);
      MessageManager.getMessages(function gotMessages(messages) {
        for (var j = 0; j < messages.length; j++) {
          ThreadListUI.delNumList.push(parseFloat(messages[j].id));
        }
      }, filter);
    }
  }