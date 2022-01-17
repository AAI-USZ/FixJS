function thlui_cleanForm() {
    var inputs = this.view.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
      inputs[i].parentNode.parentNode.classList.remove('undo-candidate');
    }
  }