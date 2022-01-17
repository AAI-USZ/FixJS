function(aDisplayPort) {
    let zoom = this._zoom;
    let resolution = aDisplayPort.resolution;
    if (zoom <= 0 || resolution <= 0)
      return;

    // "zoom" is the user-visible zoom of the "this" tab
    // "resolution" is the zoom at which we wish gecko to render "this" tab at
    // these two may be different if we are, for example, trying to render a
    // large area of the page at low resolution because the user is panning real
    // fast.
    // The gecko scroll position is in CSS pixels. The display port rect
    // values (aDisplayPort), however, are in CSS pixels multiplied by the desired
    // rendering resolution. Therefore care must be taken when doing math with
    // these sets of values, to ensure that they are normalized to the same coordinate
    // space first.

    // dRdR
    //let element = content.contentDocument;
    //dump(content.document.toSource());
    //dump(JSON.stringify(content.document));

    if (!content.document)
      return;

    let element = content.document.documentElement;
    //let thing3 = content.document.documentElement;
    if (!element)
      return;

    dump("*****GOT PAST ELEMENT");

    // we should never be drawing background tabs at resolutions other than the user-
    // visible zoom. for foreground tabs, however, if we are drawing at some other
    // resolution, we need to set the resolution as specified.
    // dRdR: window.top = content
    let cwu = content.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
    //if (BrowserApp.selectedTab == this) {
      if (resolution != this._drawZoom) {
        this._drawZoom = resolution;
        cwu.setResolution(resolution, resolution);
      }
    //} else if (resolution != zoom) {
    //  dump("Warning: setDisplayPort resolution did not match zoom for background tab!");
    //}

    // Finally, we set the display port, taking care to convert everything into the CSS-pixel
    // coordinate space, because that is what the function accepts. Also we have to fudge the
    // displayport somewhat to make sure it gets through all the conversions gecko will do on it
    // without deforming too much. See https://bugzilla.mozilla.org/show_bug.cgi?id=737510#c10
    // for details on what these operations are.
    let geckoScrollX = content.scrollX;
    let geckoScrollY = content.scrollY;
    aDisplayPort = this._dirtiestHackEverToWorkAroundGeckoRounding(aDisplayPort, geckoScrollX, geckoScrollY);

    cwu = content.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
    cwu.setDisplayPortForElement((aDisplayPort.left / resolution) - geckoScrollX,
                                 (aDisplayPort.top / resolution) - geckoScrollY,
                                 (aDisplayPort.right - aDisplayPort.left) / resolution,
                                 (aDisplayPort.bottom - aDisplayPort.top) / resolution,
                                 element);
    //cwu.setDisplayPortForElement(aDisplayPort.left, aDisplayPort.top, aDisplayPort.right, aDisplayPort.bottom, element);
    var thing1 = (aDisplayPort.left / resolution) - geckoScrollX;
    var thing2 = (aDisplayPort.top / resolution) - geckoScrollY;
    var thing3 = (aDisplayPort.right - aDisplayPort.left) / resolution;
    var thing4 = (aDisplayPort.bottom - aDisplayPort.top) / resolution;
    dump("&&&&&&&&&&&& SCROLL: " + geckoScrollX + " " + geckoScrollY);
    dump("&&&&&&&&&&&& DISPLAYPORT SET!!: " + thing1 + " " + thing2 + " " + thing3 + " " + thing4);
  }