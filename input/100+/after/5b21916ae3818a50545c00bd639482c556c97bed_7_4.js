function() {
      var size,
        _this = this;
      this.$el.html(this.__getTemplate()(this.model.attributes));
      this.$el.find("span[data-delta]").each(function(idx, elem) {
        var deltaDrag;
        deltaDrag = new DeltaDragControl($(elem), true);
        return _this._deltaDrags.push(deltaDrag);
      });
      this.$content = this.$el.find(".content");
      this.$contentScale = this.$el.find(".content-scale");
      this.__selectionChanged(this.model, this.model.get("selected"));
      this.$xInput = this.$el.find("[data-option='x']");
      this.$yInput = this.$el.find("[data-option='y']");
      this.$el.css({
        top: this.model.get("y"),
        left: this.model.get("x")
      });
      size = {
        width: this.$el.width(),
        height: this.$el.height()
      };
      if (size.width > 0 && size.height > 0) {
        this.origSize = size;
      }
      this._setUpdatedTransform();
      return this.$el;
    }