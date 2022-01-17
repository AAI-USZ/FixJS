function(clazz, name, config, patch)
      {
        var has = this.hasProperty(clazz, name);
        var compat = config._legacy || config._fast || config._cached;

        if (has)
        {
          var existingProperty = this.getPropertyDefinition(clazz, name);
          var existingCompat = existingProperty._legacy || existingProperty._fast || existingProperty._cached;

          if (compat != existingCompat) {
            throw new Error("Could not redefine existing property '" + name + "' of class '" + clazz.classname + "'.");
          }

          if (config.refine && existingProperty.init === undefined) {
            throw new Error("Could not refine a init value if there was previously no init value defined. Property '" + name + "' of class '" + clazz.classname + "'.");
          }
        }

        if (!has && config.refine) {
          throw new Error("Could not refine non-existent property: " + name + "!");
        }

        if (has && !patch) {
          throw new Error("Class " + clazz.classname + " already has a property: " + name + "!");
        }

        if (has && patch && !compat)
        {
          if (!config.refine) {
            throw new Error('Could not refine property "' + name + '" without a "refine" flag in the property definition! This class: ' + clazz.classname + ', original class: ' + this.getByProperty(clazz, name).classname + '.');
          }

          for (var key in config)
          {
            if (key !== "init" && key !== "refine") {
              throw new Error("Class " + clazz.classname + " could not refine property: " + name + "! Key: " + key + " could not be refined!");
            }
          }
        }

        if (compat) {
          return;
        }

        // Check 0.7 keys
        var allowed = config.group ? qx.core.Property.$$allowedGroupKeys : qx.core.Property.$$allowedKeys;
        for (var key in config)
        {
          if (allowed[key] === undefined) {
            throw new Error('The configuration key "' + key + '" of property "' + name + '" in class "' + clazz.classname + '" is not allowed!');
          }

          if (config[key] === undefined) {
            throw new Error('Invalid key "' + key + '" of property "' + name + '" in class "' + clazz.classname + '"! The value is undefined: ' + config[key]);
          }

          if (allowed[key] !== null && typeof config[key] !== allowed[key]) {
            throw new Error('Invalid type of key "' + key + '" of property "' + name + '" in class "' + clazz.classname + '"! The type of the key must be "' + allowed[key] + '"!');
          }
        }

        if (config.transform != null)
        {
          if (!(typeof config.transform == "string")) {
            throw new Error('Invalid transform definition of property "' + name + '" in class "' + clazz.classname + '"! Needs to be a String.');
          }
        }

        if (config.check != null)
        {
          if (!(typeof config.check == "string" ||config.check instanceof Array || config.check instanceof Function)) {
            throw new Error('Invalid check definition of property "' + name + '" in class "' + clazz.classname + '"! Needs to be a String, Array or Function.');
          }
        }

        if (config.event != null && !this.isSubClassOf(clazz, qx.core.Target))
        {
          throw new Error("Invalid property '"+name+"' in class '"+clazz.classname+"': Properties defining an event can only be defined in sub classes of 'qx.core.Target'!");
        }
      }