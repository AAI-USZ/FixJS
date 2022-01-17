function DA_init(aWindow) {

    let self = this;

    this.window = XPCNativeWrapper.unwrap(aWindow);

    this.sandbox = Cu.Sandbox(this.window,
                              { sandboxPrototype: this.window, wantXrays: false });

    // we need a xul window reference for the DOMCryptMethods
    this.xulWindow = aWindow.QueryInterface(Ci.nsIDOMWindow)
      .QueryInterface(Ci.nsIInterfaceRequestor)
      .getInterface(Ci.nsIWebNavigation)
      .QueryInterface(Ci.nsIDocShellTreeItem)
      .rootTreeItem
      .QueryInterface(Ci.nsIInterfaceRequestor)
      .getInterface(Ci.nsIDOMWindow)
      .QueryInterface(Ci.nsIDOMChromeWindow);

    crypto.setXULWindow(this.xulWindow);

    Services.obs.addObserver(this, "inner-window-destroyed", false);

    let api = {

      // "pk": Public Key encryption namespace
      pk: {
        encrypt: self.encrypt.bind(self),
        decrypt: self.promptDecrypt.bind(self),
        sign: self.sign.bind(self),
        verify: self.verify.bind(self),
        generateKeypair: self.beginGenerateKeypair.bind(self),
        getPublicKey: self.getPublicKey.bind(self),
        getAddressbook: self.getAddressbook.bind(self),
      },

      sym: {
        generateKey: self.generateSymKey.bind(self),
        wrapKey: self.wrapKey.bind(self),
        encrypt: self.symEncrypt.bind(self),
        decrypt: self.symDecrypt.bind(self),
      },

      hash: {
        SHA256: self.SHA256.bind(self)
      },

      __exposedProps__: {
        pk: "r",
        sym: "r",
        hash: "r",
      },
    };

    return api;
  }