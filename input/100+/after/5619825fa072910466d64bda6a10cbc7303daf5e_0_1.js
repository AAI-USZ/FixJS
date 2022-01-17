function(aService) {
    if (!aService.enabled) {
      return;// sanity check
    }

    // retarget the sidebar
    var sbrowser = document.getElementById("social-status-sidebar-browser");
    var make_visible = !sbrowser.service || sbrowser.service !== aService;
    sbrowser.service = aService;
    // XXX when switching providers, always open
    if (make_visible) {
      // XXX - this is misplaced and should probably be in main.js
      let broadcaster = document.getElementById("socialSidebarVisible");
      broadcaster.setAttribute("hidden", "false");
      broadcaster.setAttribute("checked", "true");
    }

    // avoid resetting the sidebar if we're already loaded.  this fixes
    // browserid use in demoservice, removes a double reload that is
    // happening from somthing upstream.
    try {
      if (sbrowser.contentWindow.location == aService.sidebarURL) return;
    } catch(e) {
      // nightly throws exception?  happens on startup only
    }

    if (sbrowser.watcher) {
      sbrowser.removeProgressListener(sbrowser.watcher);
    }
    sbrowser.addEventListener("DOMContentLoaded", function sb_contentListener() {
      sbrowser.removeEventListener("DOMContentLoaded", sb_contentListener, true);
      sbrowser.watcher = {
        QueryInterface: XPCOMUtils.generateQI([Ci.nsIWebProgressListener,
                                               Ci.nsISupportsWeakReference]),
        onLocationChange: function(/*in nsIWebProgress*/ aWebProgress,
                            /*in nsIRequest*/ aRequest,
                            /*in nsIURI*/ aLocation) {
          // ensure any location change is same-origin as the service
          if (sbrowser.service.origin != aLocation.prePath && aLocation.prePath.indexOf("resource:") != 0) {
            aRequest.cancel(Cr.NS_BINDING_ABORTED);
            Cu.reportError("unable to load new location, "+sbrowser.service.origin+" != "+aLocation.prePath);
            return;
          }
        }
      };
      sbrowser.addProgressListener(sbrowser.watcher, Ci.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
    });

    // load the new service before we block redirects, etc, we set the attribute
    // since this may be called prior to the browser element being ready to load
    // during initial startup
    try {
      sbrowser.setAttribute("src", aService.sidebarURL);
      sbrowser.contentWindow.location = aService.sidebarURL;
    } catch(e) {
      // on initial install of overlay, sbrowse may not have been ready, throwing
      // and exception on accessing contentWindow.  setting the src attr fixes
      // that, but we still need to do both for enable/disable to properly work
    }
    // setting isAppTab causes clicks to open new tabs
    sbrowser.docShell.isAppTab = true;
  }