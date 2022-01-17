function(/*in nsIWebProgress*/ aWebProgress,
                          /*in nsIRequest*/ aRequest,
                          /*in nsIURI*/ aLocation) {
      this.securityDisplay.setAttribute('label', aLocation.host);
    }