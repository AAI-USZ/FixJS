function(newValue)
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
        }