function() {
      if (xhr.status == 200) {
        try {
          let installOrigin = this._getOrigin(this._window.location.href);
          let manifest = JSON.parse(xhr.responseText, installOrigin);
          if (!this.checkManifest(manifest, installOrigin)) {
            Services.DOMRequest.fireError(request, "INVALID_MANIFEST");
          } else {
            let receipts = (aParams && aParams.receipts && Array.isArray(aParams.receipts)) ? aParams.receipts : [];
            cpmm.sendAsyncMessage("Webapps:Install", { app: { installOrigin: installOrigin,
                                                              origin: this._getOrigin(aURL),
                                                              manifestURL: aURL,
                                                              manifest: manifest,
                                                              receipts: receipts },
                                                              from: this._window.location.href,
                                                              oid: this._id,
                                                              requestID: requestID });
          }
        } catch(e) {
          Services.DOMRequest.fireError(request, "MANIFEST_PARSE_ERROR");
        }
      }
      else {
        Services.DOMRequest.fireError(request, "MANIFEST_URL_ERROR");
      }      
    }