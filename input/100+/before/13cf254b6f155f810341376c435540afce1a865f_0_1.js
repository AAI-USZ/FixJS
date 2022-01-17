function _captureUserContactInfo(data) {
    // guard / validation
    if(data.type === "submit-email-city-note" || data.type === "submit-email-city") { 
      if (data.emailAddress === "" || data.city === "")
        return;
    }
    if(data.type === "submit-email") { 
      if (data.emailAddress === "")
        return;
    }

    // create indication of interest model and save
    var ioi = new Labs.IndicationOfInterest({
          "emailAddress": data.emailAddress,
          "city": data.city,
          "note": data.note
        }).save();
    
    // show modal
    $("#contact-modal").modal('toggle');
  }