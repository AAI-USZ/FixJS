function(aContentType, aContentLocation, aRequestOrigin,
        aContext, aMimeTypeGuess, aExtra) {
      try {

        if (this._isInternalRequest(aContentLocation, aRequestOrigin)) {
          return CP_OK;
        }

        // We don't need to worry about ACE formatted IDNs because it seems
        // that they'll automatically be converted to UTF8 format before we
        // even get here, as long as they're valid and Mozilla allows the TLD
        // to have UTF8 formatted IDNs.
        var origin = requestpolicy.mod.DomainUtil
            .stripFragment(aRequestOrigin.spec);
        var dest = requestpolicy.mod.DomainUtil
            .stripFragment(aContentLocation.spec);

        if (aRequestOrigin.scheme == "moz-nullprincipal" && aContext) {
          var newOrigin = requestpolicy.mod.DomainUtil
                .stripFragment(aContext.contentDocument.documentURI);
          requestpolicy.mod.Logger.info(
              requestpolicy.mod.Logger.TYPE_CONTENT,
              "Considering moz-nullprincipal origin <"
                  + origin + "> to be origin <" + newOrigin + ">");
          origin = newOrigin;
          aRequestOrigin = requestpolicy.mod.DomainUtil.getUriObject(origin);
        }

        if (aRequestOrigin.scheme == "view-source") {
          var newOrigin = origin.split(":").slice(1).join(":");
          requestpolicy.mod.Logger.info(
            requestpolicy.mod.Logger.TYPE_CONTENT,
            "Considering view-source origin <"
              + origin + "> to be origin <" + newOrigin + ">");
          origin = newOrigin;
          aRequestOrigin = requestpolicy.mod.DomainUtil.getUriObject(origin);
        }

        if (aContentLocation.scheme == "view-source") {
          var newDest = dest.split(":").slice(1).join(":");
          requestpolicy.mod.Logger.info(
              requestpolicy.mod.Logger.TYPE_CONTENT,
              "Considering view-source destination <"
                  + dest + "> to be destination <" + newDest + ">");
          dest = newDest;
          aContentLocation = requestpolicy.mod.DomainUtil.getUriObject(dest);
        }

        if (origin == "about:blank" && aContext) {
          var newOrigin;
          if (aContext.documentURI && aContext.documentURI != "about:blank") {
            newOrigin = aContext.documentURI;
          } else if (aContext.ownerDocument &&
                     aContext.ownerDocument.documentURI &&
                     aContext.ownerDocument.documentURI != "about:blank") {
            newOrigin = aContext.ownerDocument.documentURI;
          }
          if (newOrigin) {
            newOrigin = requestpolicy.mod.DomainUtil.stripFragment(newOrigin);
            requestpolicy.mod.Logger.info(
                requestpolicy.mod.Logger.TYPE_CONTENT, "Considering origin <"
                    + origin + "> to be origin <" + newOrigin + ">");
            origin = newOrigin;
            aRequestOrigin = requestpolicy.mod.DomainUtil.getUriObject(origin);
          }
        }

        if (this._isDuplicateRequest(dest, origin)) {
          return this._lastShouldLoadCheck.result;
        }

        // Sometimes, clicking a link to a fragment will result in a request
        // where the origin is the same as the destination, but none of the
        // additional content of the page is again requested. The result is that
        // nothing ends up showing for blocked or allowed destinations because
        // all of that data was cleared due to the new request.
        // Example to test with: Click on "expand all" at
        // http://code.google.com/p/SOME_PROJECT/source/detail?r=SOME_REVISION
        if (origin == dest) {
          requestpolicy.mod.Logger.warning(
              requestpolicy.mod.Logger.TYPE_CONTENT,
              "Allowing (but not recording) request "
                  + "where origin is the same as the destination: " + origin);
          return CP_OK;
        }

        var args = [aContentType, dest, origin, aContext, aMimeTypeGuess,
            aExtra];

        if (aContext && aContext.nodeName == "LINK" &&
            (aContext.rel == "icon" || aContext.rel == "shortcut icon")) {
          this._faviconRequests[dest] = true;
        }

        // Note: If changing the logic here, also make necessary changes to
        // isAllowedRedirect).

        // Checking for link clicks, form submissions, and history requests
        // should be done before other checks. Specifically, when link clicks
        // were done after allowed-origin and other checks, then links that
        // were allowed due to other checks would end up recorded in the origin
        // url's allowed requests, and woud then show up on one tab if link
        // was opened in a new tab but that link would have been allowed
        // regardless of the link click. The original tab would then show it
        // in its menu.
        if (this._clickedLinks[origin] && this._clickedLinks[origin][dest]) {
          // Don't delete the _clickedLinks item. We need it for if the user
          // goes back/forward through their history.
          // delete this._clickedLinks[origin][dest];
          return this
              .accept("User-initiated request by link click", args, true);

        } else if (this._submittedForms[origin]
            && this._submittedForms[origin][dest.split("?")[0]]) {
          // Note: we dropped the query string from the dest because form GET
          // requests will have that added on here but the original action of
          // the form may not have had it.
          // Don't delete the _clickedLinks item. We need it for if the user
          // goes back/forward through their history.
          // delete this._submittedForms[origin][dest.split("?")[0]];
          return this.accept("User-initiated request by form submission", args,
              true);

        } else if (this._historyRequests[dest]) {
          // When the user goes back and forward in their history, a request for
          // the url comes through but is not followed by requests for any of
          // the page's content. Therefore, we make sure that our cache of
          // blocked requests isn't removed in this case.
          delete this._historyRequests[dest];
          return this.accept("History request", args, true);
        } else if (this._userAllowedRedirects[origin]
            && this._userAllowedRedirects[origin][dest]) {
          // shouldLoad is called by location.href in overlay.js as of Fx
          // 3.7a5pre and SeaMonkey 2.1a.
          return this.accept("User-allowed redirect", args, true);
        }

        var originIdentifier = this.getUriIdentifier(origin);
        var destIdentifier = this.getUriIdentifier(dest);

        if (destIdentifier == originIdentifier) {
          return this.accept("same host (at current domain strictness level)",
              args);
        }

        if (this.isAllowedOriginToDestination(originIdentifier, destIdentifier)) {
          return this.accept("Allowed origin to destination", args);
        }

        if (this.isAllowedOrigin(originIdentifier)) {
          return this.accept("Allowed origin", args);
        }

        if (this.isAllowedDestination(destIdentifier)) {
          return this.accept("Allowed destination", args);
        }

        if (this.isTemporarilyAllowedOriginToDestination(originIdentifier,
            destIdentifier)) {
          return this.accept("Temporarily allowed origin to destination", args);
        }

        if (this.isTemporarilyAllowedOrigin(originIdentifier)) {
          return this.accept("Temporarily allowed origin", args);
        }

        if (this.isTemporarilyAllowedDestination(destIdentifier)) {
          return this.accept("Temporarily allowed destination", args);
        }

        if (aRequestOrigin.scheme == "chrome") {
          if (aRequestOrigin.asciiHost == "browser") {
            // "browser" origin shows up for favicon.ico and an address entered
            // in address bar.
            return this.accept(
                "User action (e.g. address entered in address bar) or other good "
                    + "explanation (e.g. new window/tab opened)", args);
          } else {
            // TODO: It seems sketchy to allow all requests from chrome. If I
            // had to put my money on a possible bug (in terms of not blocking
            // requests that should be), I'd put it here. Doing this, however,
            // saves a lot of blocking of legitimate requests from extensions
            // that originate from their xul files. If you're reading this and
            // you know of a way to use this to evade RequestPolicy, please let
            // me know, I will be very grateful.
            return this.accept(
                "User action (e.g. address entered in address bar) or other good "
                    + "explanation (e.g. new window/tab opened)", args);
          }
        }

        // This is mostly here for the case of popup windows where the user has
        // allowed popups for the domain. In that case, the window.open() call
        // that made the popup isn't calling the wrapped version of
        // window.open() and we can't find a better way to register the source
        // and destination before the request is made. This should be able to be
        // removed if we can find a better solution for the allowed popup case.
        if (aContext && aContext.nodeName == "xul:browser" && aContext.currentURI
            && aContext.currentURI.spec == "about:blank") {
          return this
              .accept(
                  "New window (should probably only be an allowed popup's initial request)",
                  args, true);
        }

        // XMLHttpRequests made within chrome's context have these origins.
        // Greasemonkey uses such a method to provide their cross-site xhr.
        if (origin == "resource://gre/res/hiddenWindow.html" ||
            origin == "resource://gre-resources/hiddenWindow.html") {
          return this.accept(
              "Privileged request (possibly a cross-site XMLHttpRequest)",
              args, true);
        }

        for (var i = 0; i < this._compatibilityRules.length; i++) {
          var rule = this._compatibilityRules[i];
          var allowOrigin = rule[0] ? origin.indexOf(rule[0]) == 0 : true;
          var allowDest = rule[1] ? dest.indexOf(rule[1]) == 0 : true;
          if (allowOrigin && allowDest) {
            return this.accept(
                "Extension/application compatibility rule matched [" + rule[2]
                    + "]", args, true);
          }
        }

        // If the destination has a mapping (i.e. it was originally a different
        // destination but was changed into the current one), accept this
        // request if the original destination would have been accepted.
        // Check aExtra against CP_MAPPEDDESTINATION to stop further recursion.
        if (aExtra != CP_MAPPEDDESTINATION && this._mappedDestinations[dest]) {
          for (var mappedDest in this._mappedDestinations[dest]) {
            var mappedDestUriObj = this._mappedDestinations[dest][mappedDest];
            requestpolicy.mod.Logger.warning(
                requestpolicy.mod.Logger.TYPE_CONTENT,
                "Checking mapped destination: " + mappedDest);
            var mappedResult = this.shouldLoad(aContentType, mappedDestUriObj,
                aRequestOrigin, aContext, aMimeTypeGuess, CP_MAPPEDDESTINATION);
            if (mappedResult == CP_OK) {
              return CP_OK;
            }
          }
        }

        // We didn't match any of the conditions in which to allow the request,
        // so reject it.
        return aExtra == CP_MAPPEDDESTINATION ? CP_REJECT :
            this.reject("hosts don't match", args);

      } catch (e) {
        requestpolicy.mod.Logger.severe(requestpolicy.mod.Logger.TYPE_ERROR,
            "Fatal Error, " + e + ", stack was: " + e.stack);
        requestpolicy.mod.Logger.severe(requestpolicy.mod.Logger.TYPE_CONTENT,
            "Rejecting request due to internal error.");
        return this._blockingDisabled ? CP_OK : CP_REJECT;
      }

    }