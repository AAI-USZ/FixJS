function (config) {
        var controller;
        if (config == null) {
          config = {};
        }
        // TODO - This is too brute force, only accepts the first controller to be defined. That controller then must manage it's own 'Deft.mvc.ViewController' inheritance.
        if (controllerState.deftJS.controllerChain.processed.length > 0) {
          //superclassController = Class && Class.controller ? Class.superclass.controller : false;
          console.warn("We should stop and do something here!");
          controller = controllerState.deftJS.currentController;
        } else {
          controllerState.deftJS.controllerChain.processed.push(controllerClass);
          try {
            controller = Ext.create(controllerClass, config.controllerConfig || this.controllerConfig || {});
            controllerState.deftJS.currentController = controller;
          } catch (error) {
            Deft.Logger.warn("Error initializing Controllable instance: an error occurred while creating an instance of the specified controller: '" + controllerClass + "'.");
            throw error;
          }
        }

        this.getController = function () {
          return controller;
        };
        originalConstructor.apply(this, arguments);
        controller.controlView(this);
        return this;
      }