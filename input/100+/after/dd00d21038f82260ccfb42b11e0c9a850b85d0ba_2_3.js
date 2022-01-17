function(element, styles, smart)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        qx.core.Assert.assertElement(element, "Invalid argument 'element'");
        qx.core.Assert.assertMap(styles, "Invalid argument 'styles'");
        if (smart !== undefined) {
          qx.core.Assert.assertBoolean(smart, "Invalid argument 'smart'");
        }
      }

      // inline calls to "set" and "reset" because this method is very
      // performance critical!
      var styleNames = qx.bom.Style.STYLENAMES;
      var special = this.__special;

      var style = element.style;

      for (var key in styles)
      {
        var value = styles[key];
        var name = qx.bom.Style.getPropertyName(key) || key;

        if (value === undefined)
        {
          if (smart!==false && special[name]) {
            special[name].reset(element);
          } else {
            style[name] = "";
          }
        }
        else
        {
          if (smart!==false && special[name]) {
            special[name].set(element, value);
          } else {
            style[name] = value !== null ? value : "";
          }
        }
      }
    }