function kh_updatePhoneNumberview() {
    var phoneNumber = this._phoneNumber;

    // If there are digits in the phone number, show the delete button.
    if (typeof CallScreen == 'undefined') {
      var visibility = (phoneNumber.length > 0) ? 'visible' : 'hidden';
      this.deleteButton.style.visibility = visibility;
    }

    if (this.contactPrimaryInfo) {
      this.contactPrimaryInfo.value = phoneNumber;
      this.moveCaretToEnd(this.contactPrimaryInfo);
      this.formatPhoneNumber('on-call');
    } else {
      this.phoneNumberView.value = phoneNumber;
      this.moveCaretToEnd(this.phoneNumberView);
      this.formatPhoneNumber('dialpad');
    }

    this._holdTimer = null;
  }