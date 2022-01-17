function()
    {
      this.__onNativeWrapper = qx.lang.Function.listener(this._onNative, this);

			// [Bug #6501] In case of using "ios" and running application in an iframe
			// there can be a problem by same origin pilicy, in order to listen 
			// orientationchange or resize events of top frame (window.top). Therefor 
			// we are forwarding the event the event through ElementResize handler
      if (qx.core.Environment.get("os.name") == "ios" && window != window.top) 
      {
      	qx.event.Registration.addListener(document.documentElement, "resize", this.__onNativeWrapper, this);
      } else {
	      // Handle orientation change event for Android devices by the resize event.
	      // See http://stackoverflow.com/questions/1649086/detect-rotation-of-android-phone-in-the-browser-with-javascript
	      // for more information.
	      this.__nativeEventType = qx.bom.Event.supportsEvent(this.__window, "orientationchange") ?
	            "orientationchange" : "resize";
	
	      var Event = qx.bom.Event;
	      Event.addNativeListener(this.__window, this.__nativeEventType, this.__onNativeWrapper);
	    }
    }