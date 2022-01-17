function applyInterfaceTraits(interfaces) {
      for (var i = 0, j = interfaces.length; i < j; i++) {
        var iface = domain.getProperty(interfaces[i], true, true);
        var ii = iface.classInfo.instanceInfo;
        cls.implementedInterfaces.push(iface);
        applyInterfaceTraits(ii.interfaces);

        var bindings = instance.prototype;
        var iftraits = ii.traits;
        for (var i = 0, j = iftraits.length; i < j; i++) {
          var iftrait = iftraits[i];
          var ifqn = trait.name.getQualifiedName();
          var ptrait = Object.getOwnProperty(bindings, "public$" + iftrait.name.getName());
          Object.defineProperty(bindings, qn, ptrait);
        }
      }
    }