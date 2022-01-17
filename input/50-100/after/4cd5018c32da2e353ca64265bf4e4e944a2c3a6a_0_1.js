function(/*in nsIWebProgress*/ aWebProgress,
                          /*in nsIRequest*/ aRequest,
                          /*in nsIURI*/ aLocation) {
      // ensure any location change is same-origin as the service
      if (window.service.origin != aLocation.prePath && aLocation.prePath.indexOf("resource:") != 0) {
        aRequest.cancel(Cr.NS_BINDING_ABORTED);
        return;
      }

      this.securityDisplay.setAttribute('label', aLocation.host);
    }