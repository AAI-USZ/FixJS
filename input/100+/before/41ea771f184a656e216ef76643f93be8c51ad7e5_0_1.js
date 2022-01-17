function internalRequest(options) {
      if (options.requiredEmail) {
        try {
          console.log("requiredEmail has been deprecated");
        } catch(e) {
          /* ignore error */
        }
      }

      // focus an existing window
      if (w) {
        try {
          w.focus();
        }
        catch(e) {
          /* IE7 blows up here, do nothing */
        }
        return;
      }

      if (!BrowserSupport.isSupported()) {
        var reason = BrowserSupport.getNoSupportReason(),
        url = "unsupported_dialog";

        if(reason === "LOCALSTORAGE_DISABLED") {
          url = "cookies_disabled";
        }

        w = window.open(
          ipServer + "/" + url,
          null,
          windowOpenOpts);
        return;
      }

      // notify the iframe that the dialog is running so we
      // don't do duplicative work
      if (commChan) commChan.notify({ method: 'dialog_running' });

      // returnTo is used for post-email-verification redirect
      if (!options.returnTo) options.returnTo = document.location.pathname;

      w = WinChan.open({
        url: ipServer + '/sign_in',
        relay_url: ipServer + '/relay',
        window_features: windowOpenOpts,
        params: {
          method: "get",
          params: options
        }
      }, function(err, r) {
        // unpause the iframe to detect future changes in login state
        if (commChan) {
          // update the loggedInUser in the case that an assertion was generated, as
          // this will prevent the comm iframe from thinking that state has changed
          // and generating a new assertion.  IF, however, this request is not a success,
          // then we do not change the loggedInUser - and we will let the comm frame determine
          // if generating a logout event is the right thing to do
          if (!err && r && r.email) {
            commChan.notify({ method: 'loggedInUser', params: r.email });
          }
          commChan.notify({ method: 'dialog_complete' });
        }

        // clear the window handle
        w = undefined;
        if (!err && r && r.assertion) {
          try {
            if (observers.login) observers.login(r.assertion);
          } catch(e) {
            // client's observer threw an exception
          }
        }

        // if either err indicates the user canceled the signin (expected) or a
        // null response was sent (unexpected), invoke the .oncancel() handler.
        if (err === 'client closed window' || !r) {
          if (options && options.oncancel) options.oncancel();
          delete options.oncancel;
        }
      });
    }