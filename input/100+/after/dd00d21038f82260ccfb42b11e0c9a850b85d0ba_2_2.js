function(element, name, value, smart)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        qx.core.Assert.assertElement(element, "Invalid argument 'element'");
        qx.core.Assert.assertString(name, "Invalid argument 'name'");
        if (smart !== undefined) {
          qx.core.Assert.assertBoolean(smart, "Invalid argument 'smart'");
        }
      }


      // normalize name
      name = qx.bom.Style.getPropertyName(name) || name;

      // special handling for specific properties
      // through this good working switch this part costs nothing when
      // processing non-smart properties
      if (smart!==false && this.__special[name]) {
        return this.__special[name].set(element, value);
      } else {
        element.style[name] = value !== null ? value : "";
      }
    }