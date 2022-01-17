function thui_cleanForm() {
    this.input.innerHTML = '';
    var inputs = this.view.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
      inputs[i].parentNode.parentNode.classList.remove('undo-candidate');
    }
    this.delNumList = [];
  }