function()
    {
      // If OS is Android and browser is native browser,
      // quirks mode for Android should be active.
      // This means that iScroll does not use transform3d, because 
      // this causes layout problems with input fields.
      var osName =qx.core.Environment.get("os.name");
      var isAndroidQuirksMode = (osName =="android");
      
      if(isAndroidQuirksMode==true) {
        return new qx.ui.mobile.container.Scroll(false);
      } else {
        return new qx.ui.mobile.container.Scroll();
      }
    }