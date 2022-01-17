function callOrPick() {
    // FIXME: only handling 1 number
    var number = currentContact.tel[0].number;
    if (ActivityHandler.currentlyHandling) {
      ActivityHandler.pick(number);
    } else {
      var sanitizedNumber = number.replace(/-/g, '');

      var telephony = window.navigator.mozTelephony;
      if (telephony) {
        telephony.dial(sanitizedNumber);
      }
    }
  }