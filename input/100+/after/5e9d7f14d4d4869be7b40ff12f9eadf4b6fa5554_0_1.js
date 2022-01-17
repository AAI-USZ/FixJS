function(win)
    {
      // Set window.top as default, because orientationChange event is only fired top window
      var win = win||window;
      // The orientation property of window does not have the same behaviour over all devices
      // iPad has 0degrees = Portrait, Playbook has 90degrees = Portrait, same for Android Honeycomb
      //
      // To fix this an orientationNormalizer map is calculated on application start
      //
      // The calculation of getWidth and getHeight returns wrong values if you are in an input field
      // on iPad and rotate your device!
      //
      // [Bug #6501] In case of using "ios" and running application in an iframe win.orientation don't
      //  provide proper data. Because just top frame just handle orientation and resize on IOS
      var orientation = (qx.core.Environment.get("os.name") == "ios" && window != window.top) ? null : win.orientation;
      if (orientation == null) {
        // Calculate orientation from window width and window height
        orientation = this.getWidth(win) > this.getHeight(win) ? 90 : 0;
      } else {
        if (this.__orientationNormalizer == null) {
          this.__orientationNormalizer = this.__getOrientationNormalizer(win);
        }
        // Normalize orientation value
        orientation = this.__orientationNormalizer[orientation];
      }
      return orientation;
    }