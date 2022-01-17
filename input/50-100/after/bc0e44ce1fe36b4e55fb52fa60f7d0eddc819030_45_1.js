function ch_call(number) {
    if (this._isUSSD(number)) {
      UssdManager.send(number);
    } else {
      var sanitizedNumber = number.replace(/-/g, '');
      var telephony = window.navigator.mozTelephony;
      if (telephony) {
        telephony.dial(sanitizedNumber);
      }
    }
  }