function kh_init() {

    //Clean previous values in phone number
    this.phoneNumberView.value = '';
    this._phoneNumber = '';

    // Add listeners
    this.kbKeypad.addEventListener(
      'mousedown', this.keyHandler, true);
    this.kbKeypad.addEventListener(
      'mouseup', this.keyHandler, true);
    this.kbCallBarAddContact.addEventListener(
      'mouseup', this.addContact, false);
    this.kbCallBarCallAction.addEventListener(
      'mouseup', this.makeCall, false);
    this.kbDelete.addEventListener(
      'mousedown', this.deleteDigit, false);
    this.kbDelete.addEventListener(
      'mouseup', this.deleteDigit, false);
    this.kbCallBarBackAction.addEventListener(
      'mouseup', this.callbarBackAction, false);

    //Start Player of sounds in dialer
    TonePlayer.init();

    //Update UI properly
    this.render("default");

  }