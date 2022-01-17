function (aEvent, aDragSession, aDraggedText)
    {
      // Strip leading and trailing whitespace, then try to create a
      // URI from the dropped string. If that succeeds, we're
      // dropping a URI and we need to do a security check to make
      // sure the source document can load the dropped URI. We don't
      // so much care about creating the real URI here
      // (i.e. encoding differences etc don't matter), we just want
      // to know if aDraggedText really is a URI.

      aDraggedText = aDraggedText.replace(/^\s*|\s*$/g, '');

      var uri;
      var ioService = Components.classes["@mozilla.org/network/io-service;1"]
                                .getService(Components.interfaces.nsIIOService);
      try {
        uri = ioService.newURI(aDraggedText, null, null);
      } catch (e) {
      }

      if (!uri)
        return;

      // aDraggedText is a URI, do the security check.
      const nsIScriptSecurityManager = Components.interfaces
                                                 .nsIScriptSecurityManager;
      var secMan = Components.classes["@mozilla.org/scriptsecuritymanager;1"]
                             .getService(nsIScriptSecurityManager);

      if (!aDragSession)
        aDragSession = this.mDragService.getCurrentSession();

      var sourceDoc = aDragSession.sourceDocument;
      // Use "file:///" as the default sourceURI so that drops of file:// URIs
      // are always allowed.
      var principal = sourceDoc ? sourceDoc.nodePrincipal
                                : secMan.getCodebasePrincipal(ioService.newURI("file:///", null, null));

      try {
        secMan.checkLoadURIStrWithPrincipal(principal, aDraggedText,
                                            nsIScriptSecurityManager.STANDARD);
      } catch (e) {
        // Stop event propagation right here.
        aEvent.stopPropagation();

        throw "Drop of " + aDraggedText + " denied.";
      }
    }