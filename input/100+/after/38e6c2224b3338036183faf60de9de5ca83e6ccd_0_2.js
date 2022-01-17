function(blockedUri, originalUri, violatedDirective,
           aSourceFile, aScriptSample, aLineNum) {
    var uriString = this._policy.getReportURIs();
    var uris = uriString.split(/\s+/);
    if (uris.length > 0) {
      // see if we need to sanitize the blocked-uri
      let blocked = '';
      if (originalUri) {
        // We've redirected, only report the blocked origin
        let clone = blockedUri.clone();
        clone.path = '';
        blocked = clone.asciiSpec;
      }
      else if (blockedUri instanceof Ci.nsIURI) {
        blocked = blockedUri.cloneIgnoringRef().asciiSpec;
      }
      else {
        // blockedUri is a string for eval/inline-script violations
        blocked = blockedUri;
      }

      // Generate report to send composed of
      // {
      //   csp-report: {
      //     document-uri: "http://example.com/file.html?params",
      //     referrer: "...",
      //     blocked-uri: "...",
      //     violated-directive: "..."
      //   }
      // }
      var report = {
        'csp-report': {
          'document-uri': this._request,
          'referrer': this._referrer,
          'blocked-uri': blocked,
          'violated-directive': violatedDirective
        }
      }

      // extra report fields for script errors (if available)
      if (originalUri)
        report["csp-report"]["original-uri"] = originalUri.cloneIgnoringRef().asciiSpec;
      if (aSourceFile)
        report["csp-report"]["source-file"] = aSourceFile;
      if (aScriptSample)
        report["csp-report"]["script-sample"] = aScriptSample;
      if (aLineNum)
        report["csp-report"]["line-number"] = aLineNum;

      var reportString = JSON.stringify(report);
      CSPdebug("Constructed violation report:\n" + reportString);

      var violationMessage = null;
      if(blockedUri["asciiSpec"]){
         violationMessage = CSPLocalizer.getFormatStr("directiveViolatedWithURI", [violatedDirective, blockedUri.asciiSpec]);
      } else {
         violationMessage = CSPLocalizer.getFormatStr("directiveViolated", [violatedDirective]);
      }
      CSPWarning(violationMessage,
                 this.innerWindowID,
                 (aSourceFile) ? aSourceFile : null,
                 (aScriptSample) ? decodeURIComponent(aScriptSample) : null,
                 (aLineNum) ? aLineNum : null);

      // For each URI in the report list, send out a report.
      // We make the assumption that all of the URIs are absolute URIs; this
      // should be taken care of in CSPRep.fromString (where it converts any
      // relative URIs into absolute ones based on "self").
      for (let i in uris) {
        if (uris[i] === "")
          continue;

        try {
          var chan = Services.io.newChannel(uris[i], null, null);
          if(!chan) {
            CSPdebug("Error creating channel for " + uris[i]);
            continue;
          }

          var content = Cc["@mozilla.org/io/string-input-stream;1"]
                          .createInstance(Ci.nsIStringInputStream);
          content.data = reportString + "\n\n";

          // make sure this is an anonymous request (no cookies) so in case the
          // policy URI is injected, it can't be abused for CSRF.
          chan.loadFlags |= Ci.nsIChannel.LOAD_ANONYMOUS;

          // we need to set an nsIChannelEventSink on the channel object
          // so we can tell it to not follow redirects when posting the reports
          chan.notificationCallbacks = new CSPReportRedirectSink();

          chan.QueryInterface(Ci.nsIUploadChannel)
              .setUploadStream(content, "application/json", content.available());

          try {
            // if this is an HTTP channel, set the request method to post
            chan.QueryInterface(Ci.nsIHttpChannel);
            chan.requestMethod = "POST";
          } catch(e) {} // throws only if chan is not an nsIHttpChannel.

          // check with the content policy service to see if we're allowed to
          // send this request.
          try {
            var contentPolicy = Cc["@mozilla.org/layout/content-policy;1"]
                                  .getService(Ci.nsIContentPolicy);
            if (contentPolicy.shouldLoad(Ci.nsIContentPolicy.TYPE_OTHER,
                                         chan.URI, null, null, null, null)
                != Ci.nsIContentPolicy.ACCEPT) {
              continue; // skip unauthorized URIs
            }
          } catch(e) {
            continue; // refuse to load if we can't do a security check.
          }

          //send data (and set up error notifications)
          chan.asyncOpen(new CSPViolationReportListener(uris[i]), null);
          CSPdebug("Sent violation report to " + uris[i]);
        } catch(e) {
          // it's possible that the URI was invalid, just log a
          // warning and skip over that.
          CSPWarning(CSPLocalizer.getFormatStr("triedToSendReport", [uris[i]]), this.innerWindowID);
          CSPWarning(CSPLocalizer.getFormatStr("errorWas", [e.toString()]), this.innerWindowID);
        }
      }
    }
  }