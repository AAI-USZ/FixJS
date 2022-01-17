function()
    {
      this.__onNativeWrapper = qx.lang.Function.listener(this._onNative, this);

      // Handle orientation change event for Android devices by the resize event.
      // See http://stackoverflow.com/questions/1649086/detect-rotation-of-android-phone-in-the-browser-with-javascript
      // for more information.
      this.__nativeEventType = qx.bom.Event.supportsEvent(this.__window, "orientationchange") ?
            "orientationchange" : "resize";

      var Event = qx.bom.Event;
      Event.addNativeListener(this.__window, this.__nativeEventType, this.__onNativeWrapper);
    }