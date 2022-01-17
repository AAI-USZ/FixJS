function(clazz, properties, patch)
    {
      // check for the property module
      if (!qx.core.Environment.get("module.property")) {
        throw new Error("Property module disabled.");
      }

      var config;

      if (patch === undefined) {
        patch = false;
      }

      var proto = clazz.prototype;

      for (var name in properties)
      {
        config = properties[name];

        // Check incoming configuration
        if (qx.core.Environment.get("qx.debug")) {
          this.__validateProperty(clazz, name, config, patch);
        }

        // Store name into configuration
        config.name = name;

        // Add config to local registry
        if (!config.refine)
        {
          if (clazz.$$properties === undefined) {
            clazz.$$properties = {};
          }

          clazz.$$properties[name] = config;
        }

        // Store init value to prototype. This makes it possible to
        // overwrite this value in derived classes.
        if (config.init !== undefined) {
          clazz.prototype["$$init_" + name] = config.init;
        }

        // register event name
        if (config.event !== undefined) {
          // break if no events layer loaded
          if (!qx.core.Environment.get("module.events")) {
            throw new Error("Events module not enabled.");
          }
          var event = {};
          event[config.event] = "qx.event.type.Data";
          this.__addEvents(clazz, event, patch);
        }

        // Remember inheritable properties
        if (config.inheritable)
        {
          this.__Property.$$inheritable[name] = true;
          if (!proto.$$refreshInheritables) {
            this.__Property.attachRefreshInheritables(clazz);
          }
        }

        if (!config.refine) {
          this.__Property.attachMethods(clazz, name, config);
        }
      }
    }