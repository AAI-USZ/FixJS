function(clazz, iface)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!clazz || !iface) {
          throw new Error("Incomplete parameters!")
        }

        // This differs from mixins, we only check if the interface is already
        // directly used by this class. It is allowed however, to have an interface
        // included multiple times by extends in the interfaces etc.
        if (this.hasOwnInterface(clazz, iface)) {
          throw new Error('Interface "' + iface.name + '" is already used by Class "' + clazz.classname + '!');
        }

        // Check interface and wrap members
        if (clazz.$$classtype !== "abstract") {
          qx.Interface.assert(clazz, iface, true);
        }
      }

      // Store interface reference
      var list = qx.Interface.flatten([iface]);
      if (clazz.$$implements)
      {
        clazz.$$implements.push(iface);
        clazz.$$flatImplements.push.apply(clazz.$$flatImplements, list);
      }
      else
      {
        clazz.$$implements = [iface];
        clazz.$$flatImplements = list;
      }
    }