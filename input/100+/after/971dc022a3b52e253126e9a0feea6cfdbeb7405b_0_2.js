function (Class, data, hooks, callback) {
  var controllerClass, originalConstructor, originalDestroy, parameters, self, controllerState, superclassController;
  if (arguments.length === 3) {
    parameters = Ext.toArray(arguments);
    hooks = parameters[1];
    callback = parameters[2];
  }
  if ((data.mixins != null) && Ext.Array.contains(Ext.Object.getValues(data.mixins), Ext.ClassManager.get('Deft.mixin.Controllable'))) {
    controllerClass = data.controller;
    delete data.controller;
    if (controllerClass != null) {

      if (!this.__proto__.controllerState) {
        this.__proto__.controllerState = {deftJS : {currentController : undefined, controllerChain : {attempted : [], processed : []}}};
      }
      controllerState = this.__proto__.controllerState;
      controllerState.deftJS.controllerChain.attempted.push({id : Ext.id(undefined, 'attempted-controller'), class : controllerClass});

      if (!data.hasOwnProperty('constructor')) {
        data.constructor = function () {
          return this.callParent(arguments);
        };
      }
      originalConstructor = data.constructor;
      data.constructor = function (config) {
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
      };
      if (!data.hasOwnProperty('destroy')) {
        data.destroy = function () {
          return this.callParent(arguments);
        };
      }
      originalDestroy = data.destroy;
      data.destroy = function () {
        delete this.getController;
        return originalDestroy.apply(this, arguments);
      };
      self = this;
      Ext.require([controllerClass], function () {
        if (callback != null) {
          callback.call(self, Class, data, hooks);
        }
      });
      return false;
    }
  }
}