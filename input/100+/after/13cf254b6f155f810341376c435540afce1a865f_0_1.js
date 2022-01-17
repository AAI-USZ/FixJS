function _captureUserContactInfo(data) {
    // guard / validation
    if(data.type === "submit-email-city-note" || data.type === "submit-email-city") { 
      // form says that required values are not valid; eject
      if (!data.emailAddress[0].validity.valid || !data.city[0].validity.valid)
        return;
      
    }
    if(data.type === "submit-email") { 
      // form says that required value is not valid; eject
      if (!data.emailAddress[0].validity.valid) 
        return;
    }

    // we are good; create indication of interest model and save
    var ioi = new Labs.IndicationOfInterest({
      "emailAddress": data.emailAddress.val(),
      "city": data.city.val(),
      "note": data.note.val()
    }).save();
    
    // show modal
    $("#contact-modal").modal('toggle');
  }