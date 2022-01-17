function _captureUserContactInfo(data) {
    console.log(data);
    // guard / validation
    if(data.type === "submit-email-city-note") {
      if (data.emailAddress === "" || data.city === "")
        return;
    }
    // save
    // XXX: TODO
    
    // show modal
    $("#contact-modal").modal('toggle');
  }