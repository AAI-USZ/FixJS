function cm_update(phone_number) {
    this.contactPrimaryInfo.innerHTML = phone_number;
    KeypadManager._phoneNumber = phone_number;
    KeypadManager.phoneNumberView.value =
      KeypadManager._phoneNumber;
    KeypadManager.moveCaretToEnd(
      KeypadManager.phoneNumberView);
  }