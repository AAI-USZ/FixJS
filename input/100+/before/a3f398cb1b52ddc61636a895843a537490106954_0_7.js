function thui_deleteMessages() {
    this.delNumList = [];
    this.pendingDelList = [];
    var inputs = this.view.querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].parentNode.parentNode.classList.add('undo-candidate');
      if (inputs[i].value) { // sent or received
        console.log("Añado mensaje "+inputs[i].value+" a lista de borrado");
        this.delNumList.push(parseFloat(inputs[i].value));
      } else { // pending
        console.log("Añado "+inputs[i] + " a lista de pending");
        this.pendingDelList.push(inputs[i]);
      }
    }
  }