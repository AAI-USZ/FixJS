function(data, value)
    {
      var setter = qx.core.Property.$$method.set;

      if (qx.Bootstrap.isString(data))
      {
        if (!this[setter[data]])
        {
          if (this["set" + qx.Bootstrap.firstUp(data)] != undefined) {
            this["set" + qx.Bootstrap.firstUp(data)](value);
            return this;
          }

          throw new Error("No such property: " + data);
        }

        return this[setter[data]](value);
      }
      else
      {
        for (var prop in data)
        {
          if (!this[setter[prop]])
          {
            if (this["set" + qx.Bootstrap.firstUp(prop)] != undefined) {
              this["set" + qx.Bootstrap.firstUp(prop)](data[prop]);
              continue;
            }

            throw new Error("No such property: " + prop);
          }

          this[setter[prop]](data[prop]);
        }

        return this;
      }
    }