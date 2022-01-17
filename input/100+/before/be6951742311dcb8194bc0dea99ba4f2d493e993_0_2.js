function(prop)
    {
      var getter = qx.core.Property.$$method.get;

      if (!this[getter[prop]])
      {
        if (this["get" + qx.Bootstrap.firstUp(prop)] != undefined) {
          return this["get" + qx.Bootstrap.firstUp(prop)]();
        }

        if (qx.core.Environment.get("qx.debug"))
        {
          qx.Bootstrap.error(new Error("No such property: " + prop));
          return this;
        }
      }


      return this[getter[prop]]();
    }