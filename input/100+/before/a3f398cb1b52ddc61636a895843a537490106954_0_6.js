function thui_deleteAllMessages() {
    var response = window.confirm('Delete all messages\n' +
                                  'Are you sure you want to do this?');
    if (response) {
      this.delNumList = [];
      this.pendingDelList = [];
      var inputs = this.view.querySelectorAll('input[type="checkbox"]');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].parentNode.parentNode.classList.add('undo-candidate');
        if (inputs[i].value) { // sent or received
          this.delNumList.push(parseFloat(inputs[i].value));
        } else { // pending
          this.pendingDelList.push(inputs[i]);
        }
      }
    }
  }