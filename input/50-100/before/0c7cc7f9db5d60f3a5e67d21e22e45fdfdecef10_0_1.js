function _handleUserContactInfoClickEvent(e) {
    // get data elements from submitting form
    emailAddress = $('#emailAddress', e.srcElement.form);
    city = $('#city', e.srcElement.form);
    note = $('#note', e.srcElement.form);

    // package data elements and pass to capture
    var data = {
      "type": e.currentTarget.id,
      "emailAddress": emailAddress,
      "city": city,
      "note": note
    };
    _captureUserContactInfo(data);
  }