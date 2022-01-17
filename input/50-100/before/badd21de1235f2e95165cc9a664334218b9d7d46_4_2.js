function cm_update(phone_number) {
    document.getElementById('cs-h-info-primary').innerHTML = phone_number;
    KeypadManager.phoneNumber = phone_number;
    document.getElementById('phone-number-view').value =
      KeypadManager.phoneNumber;
    KeypadManager.util.moveCaretToEnd(
      document.getElementById('phone-number-view'));
  }