function() {
      var _this = this;
      this.$el.html(Templates.ItemGrabber(this.options));
      this.$el.modal();
      this.$el.modal("hide");
      this.item = this.$el.find(this.options.tag)[0];
      if (this.options.tag === "video") {
        this.$el.find(".modal-body").prepend("<div class='alert alert-success'>Supports <strong>mp4, webm</strong>.<br/>Try out: http://clips.vorwaerts-gmbh.de/VfE_html5.mp4 <br/>or: http://media.w3.org/2010/05/sintel/trailer.mp4</div>");
      }
      if (!this.options.ignoreErrors) {
        this.item.onerror = function() {
          return _this._itemLoadError();
        };
        this.item.onload = function() {
          return _this._itemLoaded();
        };
      }
      this.$input = this.$el.find("input[name='itemUrl']");
      return this.$el;
    }