function (config) {
        var controller;
        if (config == null) {
          config = {};
        }
        try {
          controller = Ext.create(controllerClass, config.controllerConfig || this.controllerConfig || {});
        } catch (error) {
          Deft.Logger.warn("Error initializing Controllable instance: an error occurred while creating an instance of the specified controller: '" + controllerClass + "'.");
          throw error;
        }
        this.getController = function () {
          return controller;
        };
        originalConstructor.apply(this, arguments);
        controller.controlView(this);
        return this;
      }