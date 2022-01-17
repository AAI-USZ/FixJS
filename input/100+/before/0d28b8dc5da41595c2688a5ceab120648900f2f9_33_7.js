function thui_deleteAllMessages() {
    var inputs = this.view.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].parentNode.parentNode.classList.add('undo-candidate');
    }
  }