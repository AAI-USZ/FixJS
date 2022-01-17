function() {
      var controllerClass, _i, _len;
      for (_i = 0, _len = controllers.length; _i < _len; _i++) {
        controllerClass = controllers[_i];
        try {
          Ext.create(controllerClass, {
            view: this
          });
        } catch (error) {
          Deft.Logger.warn("Error initializing Controllable instance: an error occurred while creating an instance of the specified controller: '" + controllerClass + "'.");
          throw error;
        }
      }
    }