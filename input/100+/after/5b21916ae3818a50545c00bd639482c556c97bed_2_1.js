function(SpatialObject) {
  var defaultScale, defaults;
  defaults = {
    x: window.slideConfig.size.width / 3,
    y: window.slideConfig.size.height / 3
  };
  defaultScale = {
    x: 1,
    y: 1
  };
  return SpatialObject.extend({
    initialize: function() {
      _.defaults(this.attributes, defaults);
      if (!(this.attributes.scale != null)) {
        this.attributes.scale = {};
        return _.defaults(this.attributes.scale, defaultScale);
      }
    },
    dispose: function() {
      this.trigger("dispose", this);
      return this.off();
    },
    constructor: function Component() {
			SpatialObject.prototype.constructor.apply(this, arguments);
		}
  });
}