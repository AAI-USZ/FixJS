function(docShell) {
    if (!docShell) { return false; }
    CSPdebug(" in permitsAncestry(), docShell = " + docShell);

    // walk up this docShell tree until we hit chrome
    var dst = docShell.QueryInterface(Ci.nsIInterfaceRequestor)
                      .getInterface(Ci.nsIDocShellTreeItem);

    // collect ancestors and make sure they're allowed.
    var ancestors = [];
    while (dst.parent) {
      dst = dst.parent;
      let it = dst.QueryInterface(Ci.nsIInterfaceRequestor)
                  .getInterface(Ci.nsIWebNavigation);
      if (it.currentURI) {
        if (it.currentURI.scheme === "chrome") {
          break;
        }
        let ancestor = it.currentURI;
        CSPdebug(" found frame ancestor " + ancestor.asciiSpec);
        ancestors.push(ancestor);
      }
    } 

    // scan the discovered ancestors
    let cspContext = CSPRep.SRC_DIRECTIVES.FRAME_ANCESTORS;
    for (let i in ancestors) {
      let ancestor = ancestors[i].prePath;
      if (!this._policy.permits(ancestor, cspContext)) {
        // report the frame-ancestor violation
        let directive = this._policy._directives[cspContext];
        let violatedPolicy = (directive._isImplicit
                                ? 'default-src' : 'frame-ancestors ')
                                + directive.toString();

        this._asyncReportViolation(ancestors[i], null, violatedPolicy);

        // need to lie if we are testing in report-only mode
        return this._reportOnlyMode;
      }
    }
    return true;
  }