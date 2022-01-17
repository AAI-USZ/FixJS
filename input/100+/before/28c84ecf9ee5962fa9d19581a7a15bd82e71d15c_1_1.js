function(name, config)
    {
      if (!config) {
        var config = {};
      }

      // Normalize include to array
      if (config.include && !(qx.Bootstrap.getClass(config.include) === "Array")) {
        config.include = [config.include];
      }

      // Normalize implement to array
      if (config.implement && !(qx.Bootstrap.getClass(config.implement) === "Array")) {
        config.implement = [config.implement];
      }

      // Normalize type
      var implicitType = false;
      if (!config.hasOwnProperty("extend") && !config.type) {
        config.type = "static";
        implicitType = true;
      }

      // Validate incoming data
      if (qx.core.Environment.get("qx.debug")) {
        try {
          this.__validateConfig(name, config);
        } catch(ex) {
          if (implicitType) {
            ex.message = 'Assumed static class because no "extend" key was found. ' + ex.message;
          }
          throw ex;
        }
      }

      // Create the class
      var clazz = this.__createClass(name, config.type, config.extend, config.statics, config.construct, config.destruct, config.include);

      // Members, properties, events and mixins are only allowed for non-static classes
      if (config.extend)
      {
        // Attach properties
        if (config.properties) {
          this.__addProperties(clazz, config.properties, true);
        }

        // Attach members
        if (config.members) {
          this.__addMembers(clazz, config.members, true, true, false);
        }

        // Process events
        if (config.events) {
          this.__addEvents(clazz, config.events, true);
        }

        // Include mixins
        // Must be the last here to detect conflicts
        if (config.include)
        {
          for (var i=0, l=config.include.length; i<l; i++) {
            this.__addMixin(clazz, config.include[i], false);
          }
        }
      }

      // Process environment
      if (config.environment)
      {
        for (var key in config.environment) {
          qx.core.Environment.add(key, config.environment[key]);
        }
      }

      // Interface support for non-static classes
      if (config.implement)
      {
        for (var i=0, l=config.implement.length; i<l; i++) {
          this.__addInterface(clazz, config.implement[i]);
        }
      }


      if (qx.core.Environment.get("qx.debug")) {
        this.__validateAbstractInterfaces(clazz);
      }


      // Process defer
      if (config.defer)
      {
        config.defer.self = clazz;
        config.defer(clazz, clazz.prototype,
        {
          add : function(name, config)
          {
            // build pseudo properties map
            var properties = {};
            properties[name] = config;

            // execute generic property handler
            qx.Class.__addProperties(clazz, properties, true);
          }
        });
      }

      return clazz;
    }