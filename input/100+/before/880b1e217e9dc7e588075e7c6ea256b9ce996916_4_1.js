function(ComponentView) {
  return ComponentView.extend({
    className: "component videoView",
    initialize: function() {
      return ComponentView.prototype.initialize.apply(this, arguments);
    },
    render: function() {
      var $video;
      ComponentView.prototype.render.call(this);
      $video = $("<video src=" + (this.model.get('src')) + "></video>");
      this.$el.find(".content").append($video);
      return this.$el;
    }
  });
}