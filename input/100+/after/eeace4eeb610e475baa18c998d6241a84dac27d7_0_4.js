function csp_shouldLoad(aContentType, 
                          aContentLocation, 
                          aRequestOrigin, 
                          aContext, 
                          aMimeTypeGuess, 
                          aOriginalUri) {

    // don't filter chrome stuff
    if (aContentLocation.scheme === 'chrome' ||
        aContentLocation.scheme === 'resource') {
      return Ci.nsIContentPolicy.ACCEPT;
    }

    // interpret the context, and then pass off to the decision structure
    CSPdebug("shouldLoad location = " + aContentLocation.asciiSpec);
    CSPdebug("shouldLoad content type = " + aContentType);
    var cspContext = ContentSecurityPolicy._MAPPINGS[aContentType];

    // if the mapping is null, there's no policy, let it through.
    if (!cspContext) {
      return Ci.nsIContentPolicy.ACCEPT;
    }

    // otherwise, honor the translation
    // var source = aContentLocation.scheme + "://" + aContentLocation.hostPort; 
    var res = this._policy.permits(aContentLocation, cspContext)
              ? Ci.nsIContentPolicy.ACCEPT 
              : Ci.nsIContentPolicy.REJECT_SERVER;

    // frame-ancestors is taken care of early on (as this document is loaded)

    // If the result is *NOT* ACCEPT, then send report
    if (res != Ci.nsIContentPolicy.ACCEPT) { 
      CSPdebug("blocking request for " + aContentLocation.asciiSpec);
      try {
        let directive = this._policy._directives[cspContext];
        let violatedPolicy = (directive._isImplicit
                                ? 'default-src' : cspContext)
                                + ' ' + directive.toString();
        this._asyncReportViolation(aContentLocation, aOriginalUri, violatedPolicy);
      } catch(e) {
        CSPdebug('---------------- ERROR: ' + e);
      }
    }

    return (this._reportOnlyMode ? Ci.nsIContentPolicy.ACCEPT : res);
  }