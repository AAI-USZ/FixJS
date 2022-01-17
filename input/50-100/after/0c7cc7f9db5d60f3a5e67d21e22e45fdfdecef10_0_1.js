function _handleUserContactInfoClickEvent(e) {
    // get data elements from submitting form
    emailAddress = $('#emailAddress', e.target.form);
    city = $('#city', e.target.form);
    note = $('#note', e.target.form);

    // package data elements and pass to capture
    var data = {
      "type": e.currentTarget.id,
      "emailAddress": emailAddress,
      "city": city,
      "note": note
    };
    _captureUserContactInfo(data);
  }