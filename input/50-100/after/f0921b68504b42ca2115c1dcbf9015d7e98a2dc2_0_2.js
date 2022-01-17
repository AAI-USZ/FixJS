function thui_deleteMessages() {
    var inputs = this.view.querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].parentNode.parentNode.classList.add('undo-candidate');
      if (inputs[i].id) { // sent or received
        this.delNumList.push(parseFloat(inputs[i].id));
      } else { // pending
          // another list to delete from pending?
      }
    }
  }