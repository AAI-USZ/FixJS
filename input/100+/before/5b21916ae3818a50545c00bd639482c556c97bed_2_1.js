function(SpatialObject) {
  var defaults;
  defaults = {
    x: window.slideConfig.size.width / 3,
    y: window.slideConfig.size.height / 3
  };
  return SpatialObject.extend({
    initialize: function() {
      return _.defaults(this.attributes, defaults);
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