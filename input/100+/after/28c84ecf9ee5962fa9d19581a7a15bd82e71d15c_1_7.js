function(clazz)
    {
      var name = clazz.classname;
      var wrapper = this.__wrapConstructor(clazz, name, clazz.$$classtype);

      // copy all keys from the wrapped constructor to the wrapper
      for (var i=0, a=qx.Bootstrap.getKeys(clazz), l=a.length; i<l; i++)
      {
        key = a[i];
        wrapper[key] = clazz[key];
      }

      // fix prototype
      wrapper.prototype = clazz.prototype;

      // fix self references in members
      var members = clazz.prototype;
      for (var i=0, a=qx.Bootstrap.getKeys(members), l=a.length; i<l; i++)
      {
        key = a[i];
        var method = members[key];

        // check if method is available because null values can be stored as
        // init values on classes e.g. [BUG #3709]
        if (method && method.self == clazz) {
          method.self = wrapper;
        }
      }

      // fix base and superclass references in all defined classes
      for(var key in this.$$registry)
      {
        var construct = this.$$registry[key];
        if (!construct) {
          continue;
        }

        if (construct.base == clazz) {
          construct.base = wrapper;
        }
        if (construct.superclass == clazz) {
          construct.superclass = wrapper;
        }

        if (construct.$$original)
        {
          if (construct.$$original.base == clazz) {
            construct.$$original.base = wrapper;
          }
          if (construct.$$original.superclass == clazz) {
            construct.$$original.superclass = wrapper;
          }
        }
      }
      qx.Bootstrap.createNamespace(name, wrapper);
      this.$$registry[name] = wrapper;

      return wrapper;
    }