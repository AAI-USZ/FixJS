function thlui_deleteAllThreads() {
    var response = window.confirm("Delete all conversations\n" +
                                  "Are you sure you want to do this?");
    if (response) {
      var inputs = this.view.querySelectorAll('input[type="checkbox"]');
      for (var i = 0; i < inputs.length; i++) {
          inputs[i].parentNode.parentNode.classList.add('undo-candidate');
      }
    }
  }