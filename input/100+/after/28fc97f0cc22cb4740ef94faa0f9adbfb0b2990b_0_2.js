function(prop)
    {
      var getter = qx.core.Property.$$method.get;

      if (!this[getter[prop]])
      {
        if (this["get" + qx.Bootstrap.firstUp(prop)] != undefined) {
          return this["get" + qx.Bootstrap.firstUp(prop)]();
        }

        throw new Error("No such property: " + prop);
      }


      return this[getter[prop]]();
    }