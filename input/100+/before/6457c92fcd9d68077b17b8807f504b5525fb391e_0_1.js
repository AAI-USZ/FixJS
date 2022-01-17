function(dataTransfer, uriString, disallowInherit)
  {
    if (!uriString)
      return "";

    // Strip leading and trailing whitespace, then try to create a
    // URI from the dropped string. If that succeeds, we're
    // dropping a URI and we need to do a security check to make
    // sure the source document can load the dropped URI.
    uriString = uriString.replace(/^\s*|\s*$/g, '');

    let uri;
    let ioService = Cc["@mozilla.org/network/io-service;1"]
                      .getService(Components.interfaces.nsIIOService);
    try {
      // Check that the uri is valid first and return an empty string if not.
      // It may just be plain text and should be ignored here
      uri = ioService.newURI(uriString, null, null);
    } catch (ex) { }
    if (!uri)
      return uriString;

    // uriString is a valid URI, so do the security check.
    let secMan = Cc["@mozilla.org/scriptsecuritymanager;1"].
                   getService(Ci.nsIScriptSecurityManager);
    let sourceNode = dataTransfer.mozSourceNode;
    let flags = secMan.STANDARD;
    if (disallowInherit)
      flags |= secMan.DISALLOW_INHERIT_PRINCIPAL;

    // Use file:/// as the default uri so that drops of file URIs are always allowed
    let principal = sourceNode ? sourceNode.principal
                               : secMan.getCodebasePrincipal(ioService.newURI("file:///", null, null));

    secMan.checkLoadURIStrWithPrincipal(principal, uriString, flags);

    return uriString;
  }