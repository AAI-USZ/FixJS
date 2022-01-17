function(aZoom, aForce) {
    // Set zoom level
    if (aForce || Math.abs(aZoom - this._zoom) >= 1e-6) {
      this._zoom = aZoom;
      if (BrowserApp.selectedTab == this) {
        let cwu = window.top.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
        this._drawZoom = aZoom;
        cwu.setResolution(aZoom, aZoom);
      }
    }
  }