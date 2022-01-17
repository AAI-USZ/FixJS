function(Backbone, DefaultState) {
    Backbone.sync = function(method, model, options) {
      if (options.keyTrail != null) {
        return options.success(DefaultState.get(options.keyTrail));
      }
    };
    window.slideConfig = {
      size: {
        width: 1024,
        height: 768
      }
    };
    return continuation();
  }