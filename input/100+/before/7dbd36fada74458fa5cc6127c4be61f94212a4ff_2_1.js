function(Class, data, hooks, callback) {
  var controller, controllers, self;
  if (arguments.length === 3) {
    hooks = arguments[1];
    callback = arguments[2];
  }
  if ((data.mixins != null) && Ext.Array.contains(data.mixins, Ext.ClassManager.get('Deft.mixin.Controllable'))) {
    controller = data.controller;
    delete data.controller;
    controllers = [];
    if (controller != null) {
      controllers = Ext.isArray(controller) ? controller : [controller];
    }
    Class.prototype.constructor = Ext.Function.createSequence(Class.prototype.constructor, function() {
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
    });
    if (controllers.length > 0) {
      self = this;
      Ext.require(controllers, function() {
        if (callback != null) {
          callback.call(self, Class, data, hooks);
        }
      });
      return false;
    }
  }
}