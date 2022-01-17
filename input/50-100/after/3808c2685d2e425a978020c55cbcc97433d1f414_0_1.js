function(/*in nsIWebProgress*/ aWebProgress,
                            /*in nsIRequest*/ aRequest,
                            /*in nsIURI*/ aLocation) {
          // ensure any location change is same-origin as the service
          if (sbrowser.service.origin != aLocation.prePath &&
              aLocation.prePath.indexOf("resource:") != 0  &&
              aLocation.prePath.indexOf("about:") != 0) {
            aRequest.cancel(Cr.NS_BINDING_ABORTED);
            Cu.reportError("unable to load new location, "+sbrowser.service.origin+" != "+aLocation.prePath);
            return;
          }
        }