function cm_toggleKeypad() {
    KeypadManager.render("keyPadVisibleDuringCall");
    this.update(KeypadManager._phoneNumber);
    // KeypadManager.kbKeypad.classList.add("no-toolbar");
    this.views.classList.toggle('show');
  }