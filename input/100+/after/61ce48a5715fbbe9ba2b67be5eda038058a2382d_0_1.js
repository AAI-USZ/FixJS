function(value, old)
    {
      if (qx.core.Environment.get("event.help")) {
        var document = this.getDocument();
        if (!document) {
          return;
        }

        try
        {
          if (old === false) {
            qx.bom.Event.removeNativeListener(document, "help", qx.lang.Function.returnFalse);
          }

          if (value === false) {
            qx.bom.Event.addNativeListener(document, "help", qx.lang.Function.returnFalse);
          }
        } catch (e) {
          if (qx.core.Environment.get("qx.debug")) {
            this.warn(
              "Unable to set 'nativeHelp' property, possibly due to security restrictions"
            );
          }
        }
      }
    }