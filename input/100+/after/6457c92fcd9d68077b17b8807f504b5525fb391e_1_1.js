function() {
    debug("Starting up.");
    sendAsyncMsg("hello");

    BrowserElementPromptService.mapWindowToBrowserElementChild(content, this);

    docShell.isBrowserFrame = true;
    docShell.QueryInterface(Ci.nsIWebProgress)
            .addProgressListener(this._progressListener,
                                 Ci.nsIWebProgress.NOTIFY_LOCATION |
                                 Ci.nsIWebProgress.NOTIFY_SECURITY |
                                 Ci.nsIWebProgress.NOTIFY_STATE_WINDOW);

    // This is necessary to get security web progress notifications.
    var securityUI = Cc['@mozilla.org/secure_browser_ui;1']
                       .createInstance(Ci.nsISecureBrowserUI);
    securityUI.init(content);

    // A mozbrowser iframe contained inside a mozapp iframe should return false
    // for nsWindowUtils::IsPartOfApp (unless the mozbrowser iframe is itself
    // also mozapp).  That is, mozapp is transitive down to its children, but
    // mozbrowser serves as a barrier.
    //
    // This is because mozapp iframes have some privileges which we don't want
    // to extend to untrusted mozbrowser content.
    //
    // Get the app manifest from the parent, if our frame has one.
    let appManifestURL = sendSyncMsg('get-mozapp-manifest-url')[0];
    let windowUtils = content.QueryInterface(Ci.nsIInterfaceRequestor)
                             .getInterface(Ci.nsIDOMWindowUtils);

    if (!!appManifestURL) {
      windowUtils.setIsApp(true);
      windowUtils.setApp(appManifestURL);
    } else {
      windowUtils.setIsApp(false);
    }

    // A cache of the menuitem dom objects keyed by the id we generate
    // and pass to the embedder
    this._ctxHandlers = {};
    // Counter of contextmenu events fired
    this._ctxCounter = 0;

    addEventListener('DOMTitleChanged',
                     this._titleChangedHandler.bind(this),
                     /* useCapture = */ true,
                     /* wantsUntrusted = */ false);

    addEventListener('DOMLinkAdded',
                     this._iconChangedHandler.bind(this),
                     /* useCapture = */ true,
                     /* wantsUntrusted = */ false);

    var self = this;
    function addMsgListener(msg, handler) {
      addMessageListener('browser-element-api:' + msg, handler.bind(self));
    }

    addMsgListener("get-screenshot", this._recvGetScreenshot);
    addMsgListener("set-visible", this._recvSetVisible);
    addMsgListener("get-can-go-back", this._recvCanGoBack);
    addMsgListener("get-can-go-forward", this._recvCanGoForward);
    addMsgListener("go-back", this._recvGoBack);
    addMsgListener("go-forward", this._recvGoForward);
    addMsgListener("reload", this._recvReload);
    addMsgListener("stop", this._recvStop);
    addMsgListener("unblock-modal-prompt", this._recvStopWaiting);
    addMsgListener("fire-ctx-callback", this._recvFireCtxCallback);

    let els = Cc["@mozilla.org/eventlistenerservice;1"]
                .getService(Ci.nsIEventListenerService);

    // We are using the system group for those events so if something in the
    // content called .stopPropagation() this will still be called.
    els.addSystemEventListener(global, 'keydown',
                               this._keyEventHandler.bind(this),
                               /* useCapture = */ true);
    els.addSystemEventListener(global, 'keypress',
                               this._keyEventHandler.bind(this),
                               /* useCapture = */ true);
    els.addSystemEventListener(global, 'keyup',
                               this._keyEventHandler.bind(this),
                               /* useCapture = */ true);
    els.addSystemEventListener(global, 'DOMWindowClose',
                               this._closeHandler.bind(this),
                               /* useCapture = */ false);
    els.addSystemEventListener(global, 'contextmenu',
                               this._contextmenuHandler.bind(this),
                               /* useCapture = */ false);
  }