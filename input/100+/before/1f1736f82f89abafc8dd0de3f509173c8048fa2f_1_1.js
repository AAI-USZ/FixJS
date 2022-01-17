function BrowserElementParent(frameLoader) {
  debug("Creating new BrowserElementParent object for " + frameLoader);
  this._domRequestCounter = 0;
  this._pendingDOMRequests = {};

  this._frameElement = frameLoader.QueryInterface(Ci.nsIFrameLoader).ownerElement;
  if (!this._frameElement) {
    debug("No frame element?");
    return;
  }

  this._mm = frameLoader.messageManager;

  // Messages we receive are handed to functions which take a (data) argument,
  // where |data| is the message manager's data object.

  let self = this;
  function addMessageListener(msg, handler) {
    function checkedHandler() {
      if (self._isAlive()) {
        return handler.apply(self, arguments);
      }
    }
    self._mm.addMessageListener('browser-element-api:' + msg, checkedHandler);
  }

  addMessageListener("hello", this._recvHello);
  addMessageListener("contextmenu", this._fireCtxMenuEvent);
  addMessageListener("locationchange", this._fireEventFromMsg);
  addMessageListener("loadstart", this._fireEventFromMsg);
  addMessageListener("loadend", this._fireEventFromMsg);
  addMessageListener("titlechange", this._fireEventFromMsg);
  addMessageListener("iconchange", this._fireEventFromMsg);
  addMessageListener("close", this._fireEventFromMsg);
  addMessageListener("securitychange", this._fireEventFromMsg);
  addMessageListener("error", this._fireEventFromMsg);
  addMessageListener("scroll", this._fireEventFromMsg);
  addMessageListener("get-mozapp-manifest-url", this._sendMozAppManifestURL);
  addMessageListener("keyevent", this._fireKeyEvent);
  addMessageListener("showmodalprompt", this._handleShowModalPrompt);
  addMessageListener('got-screenshot', this._gotDOMRequestResult);
  addMessageListener('got-can-go-back', this._gotDOMRequestResult);
  addMessageListener('got-can-go-forward', this._gotDOMRequestResult);

  function defineMethod(name, fn) {
    XPCNativeWrapper.unwrap(self._frameElement)[name] = function() {
      if (self._isAlive()) {
        return fn.apply(self, arguments);
      }
    };
  }

  function defineDOMRequestMethod(domName, msgName) {
    XPCNativeWrapper.unwrap(self._frameElement)[domName] = function() {
      if (self._isAlive()) {
        return self._sendDOMRequest(msgName);
      }
    };
  }

  // Define methods on the frame element.
  defineMethod('setVisible', this._setVisible);
  defineMethod('sendMouseEvent', this._sendMouseEvent);
  if (Services.prefs.getBoolPref(TOUCH_EVENTS_ENABLED_PREF)) {
    defineMethod('sendTouchEvent', this._sendTouchEvent);
  }
  defineMethod('goBack', this._goBack);
  defineMethod('goForward', this._goForward);
  defineMethod('reload', this._reload);
  defineMethod('stop', this._stop);
  defineDOMRequestMethod('getScreenshot', 'get-screenshot');
  defineDOMRequestMethod('getCanGoBack', 'get-can-go-back');
  defineDOMRequestMethod('getCanGoForward', 'get-can-go-forward');

  // Listen to mozvisibilitychange on the iframe's owner window, and forward it
  // down to the child.
  this._window.addEventListener('mozvisibilitychange',
                                this._ownerVisibilityChange.bind(this),
                                /* useCapture = */ false,
                                /* wantsUntrusted = */ false);
}