function(config, proto)
    {
      if (typeof config !== "object") {
        throw new Error("AddProperty: Param should be an object!");
      }

      if (typeof config.name !== "string") {
        throw new Error("AddProperty: Malformed input parameters: name needed!");
      }

      // Auto-detect dispose properties
      if (config.dispose === undefined && (config.type == "function" || config.type == "object")) {
        config.dispose = true;
      }

      config.method = qx.lang.String.toFirstUp(config.name);
      config.implMethod = config.impl ? qx.lang.String.toFirstUp(config.impl) : config.method;

      if (config.defaultValue === undefined) {
        config.defaultValue = null;
      }

      config.allowNull = config.allowNull !== false;
      config.allowMultipleArguments = config.allowMultipleArguments === true;

      if (typeof config.type === "string") {
        config.hasType = true;
      } else if (typeof config.type !== "undefined") {
        throw new Error("AddProperty: Invalid type definition for property " + config.name + ": " + config.type);
      } else {
        config.hasType = false;
      }

      if (typeof config.instance === "string") {
        config.hasInstance = true;
      } else if (typeof config.instance !== "undefined") {
        throw new Error("AddProperty: Invalid instance definition for property " + config.name + ": " + config.instance);
      } else {
        config.hasInstance = false;
      }

      if (typeof config.classname === "string") {
        config.hasClassName = true;
      } else if (typeof config.classname !== "undefined") {
        throw new Error("AddProperty: Invalid classname definition for property " + config.name + ": " + config.classname);
      } else {
        config.hasClassName = false;
      }

      config.hasConvert = config.convert != null;
      config.hasPossibleValues = config.possibleValues != null;

      config.addToQueue = config.addToQueue || false;
      config.addToQueueRuntime = config.addToQueueRuntime || false;

      // upper-case name
      config.up = config.name.toUpperCase();

      // new style keys (compatible to qx.core.Property)
      var valueKey = qx.core.Property.$$store.user[config.name] = "__user$" + config.name;

      // old style keys
      var changeKey = "change" + config.method;
      var modifyKey = "_modify" + config.implMethod;
      var checkKey = "_check" + config.implMethod;

      var method = qx.core.Property.$$method;
      if (!method.set[config.name])
      {
        method.set[config.name] = "set" + config.method;
        method.get[config.name] = "get" + config.method;
        method.reset[config.name] = "reset" + config.method;
      }

      // apply default value
      proto[valueKey] = config.defaultValue;

      // building getFoo(): Returns current stored value
      proto["get" + config.method] = function() {
        return this[valueKey];
      };

      // building forceFoo(): Set (override) without do anything else
      proto["force" + config.method] = function(newValue) {
        return this[valueKey] = newValue;
      };

      // building resetFoo(): Reset value to default value
      proto["reset" + config.method] = function() {
        return this["set" + config.method](config.defaultValue);
      };

      // building toggleFoo(): Switching between two boolean values
      if (config.type === "boolean")
      {
        proto["toggle" + config.method] = function(newValue) {
          return this["set" + config.method](!this[valueKey]);
        };
      }

      if (config.allowMultipleArguments || config.hasConvert || config.hasInstance || config.hasClassName || config.hasPossibleValues || config.hasUnitDetection || config.addToQueue || config.addToQueueRuntime || config.addToStateQueue)
      {
        // building setFoo(): Setup new value, do type and change detection, converting types, call unit detection, ...
        proto["set" + config.method] = function(newValue)
        {
          // convert multiple arguments to array
          if (config.allowMultipleArguments && arguments.length > 1) {
            newValue = qx.lang.Array.fromArguments(arguments);
          }

          // support converter methods
          if (config.hasConvert)
          {
            try {
              newValue = config.convert.call(this, newValue, config);
            } catch(ex) {
              throw new Error("Attention! Could not convert new value for " + config.name + ": " + newValue + ": " + ex);
            }
          }

          var oldValue = this[valueKey];

          if (newValue === oldValue) {
            return newValue;
          }

          if (!(config.allowNull && newValue == null))
          {
            if (config.hasType && typeof newValue !== config.type) {
              throw new Error("Attention! The value \"" + newValue + "\" is an invalid value for the property \"" + config.name + "\" which must be typeof \"" + config.type + "\" but is typeof \"" + typeof newValue + "\"!");
            }

            if (qx.Class.getByName(config.instance))
            {
              if (config.hasInstance && !(newValue instanceof qx.Class.getByName(config.instance))) {
                throw new Error("Attention! The value \"" + newValue + "\" is an invalid value for the property \"" + config.name + "\" which must be an instance of \"" + config.instance + "\"!");
              }
            }
            else if (qx.core.Variant.isSet("qx.compatibility", "on"))
            {
              if (config.hasInstance && !(newValue instanceof qx.OO.classes[config.instance])) {
                throw new Error("Attention! The value \"" + newValue + "\" is an invalid value for the property \"" + config.name + "\" which must be an instance of \"" + config.instance + "\"!");
              }
            }

            if (config.hasClassName && newValue.classname != config.classname) {
              throw new Error("Attention! The value \"" + newValue + "\" is an invalid value for the property \"" + config.name + "\" which must be an object with the classname \"" + config.classname + "\"!");
            }

            if (config.hasPossibleValues && newValue != null && !qx.lang.Array.contains(config.possibleValues, newValue)) {
              throw new Error("Failed to save value for " + config.name + ". '" + newValue + "' is not a possible value!");
            }
          }

          // Allow to check and transform the new value before storage
          if (this[checkKey])
          {
            try
            {
              newValue = this[checkKey](newValue, config);

              // Don't do anything if new value is indentical to old value
              if (newValue === oldValue) {
                return newValue;
              }
            }
            catch(ex)
            {
              throw new Error( "Failed to check property " + config.name + " " + ex );
            }
          }

          // Store new value
          this[valueKey] = newValue;

          // Check if there is a modifier implementation
          if (this[modifyKey])
          {
            try
            {
              this[modifyKey](newValue, oldValue, config);
            }
            catch(ex)
            {
              throw new Error( "Modification of property \"" + config.name + "\" failed with exception " + ex );
            }
          }

          // Auto queue addition support
          if (config.addToQueue) {
            this.addToQueue(config.name);
          }

          if (config.addToQueueRuntime) {
            this.addToQueueRuntime(config.name);
          }

          // Auto state queue addition support
          if (config.addToStateQueue) {
            this.addToStateQueue();
          }

          // Create Event
          if (this.hasEventListeners && this.hasEventListeners(changeKey))
          {
            try {
              this.createDispatchDataEvent(changeKey, newValue);
            } catch(ex) {
              throw new Error("Property " + config.name + " modified: Failed to dispatch change event: " + ex);
            }
          }

          return newValue;
        };
      }
      else
      {
        // building setFoo(): Setup new value, do type and change detection, converting types, call unit detection, ...
        proto["set" + config.method] = function(newValue)
        {
          var oldValue = this[valueKey];

          if (newValue === oldValue) {
            return newValue;
          }

          if (!(config.allowNull && newValue == null))
          {
            if (config.hasType && typeof newValue !== config.type) {
              throw new Error("Attention! The value \"" + newValue + "\" is an invalid value for the property \"" + config.name + "\" which must be typeof \"" + config.type + "\" but is typeof \"" + typeof newValue + "\"!");
            }
          }

          // Allow to check and transform the new value before storage
          if (this[checkKey])
          {
            try
            {
              newValue = this[checkKey](newValue, config);

              // Don't do anything if new value is indentical to old value
              if (newValue === oldValue) {
                return newValue;
              }
            }
            catch(ex)
            {
              throw new Error( "Failed to check property " + config.name + " " + ex );
            }
          }

          // Store new value
          this[valueKey] = newValue;

          // Check if there is a modifier implementation
          if (this[modifyKey])
          {
            try
            {
              this[modifyKey](newValue, oldValue, config);
            }
            catch(ex)
            {
              throw new Error( "Setting property \"" + config.name + "\" to \"" + newValue + "\" failed with exception " + ex );
            }
          }

          // Create Event
          if (this.hasEventListeners && this.hasEventListeners(changeKey))
          {
            var vEvent = new qx.event.type.DataEvent(changeKey, newValue, oldValue, false);

            vEvent.setTarget(this);

            try {
              this.dispatchEvent(vEvent, true);
            } catch(ex) {
              throw new Error("Property " + config.name + " modified: Failed to dispatch change event: " + ex);
            }
          }

          return newValue;
        };
      }

      // Attach self to handle protected protection
      proto["set" + config.method].self = proto.constructor;

      // building user configured get alias for property
      if (typeof config.getAlias === "string") {
        proto[config.getAlias] = proto["get" + config.method];
      }

      // building user configured set alias for property
      if (typeof config.setAlias === "string") {
        proto[config.setAlias] = proto["set" + config.method];
      }
    }