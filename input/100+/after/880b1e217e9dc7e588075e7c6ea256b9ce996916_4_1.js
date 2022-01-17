function() {
      var $video,
        _this = this;
      ComponentView.prototype.render.call(this);
      $video = $("<video controls></video>");
      $video.append("<source preload='metadata' src='" + (this.model.get("src")) + "' type='" + (this.model.get("videoType")) + "' />");
      $video.bind("loadedmetadata", function() {
        return _this._finishRender($video);
      });
      this.$el.find(".content").append($video);
      return this.$el;
    }