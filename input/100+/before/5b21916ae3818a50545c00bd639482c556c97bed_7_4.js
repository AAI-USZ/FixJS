function() {
      var _this = this;
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
      setTimeout(function() {
        var size;
        size = {
          width: _this.$el.width(),
          height: _this.$el.height()
        };
        if (size.width > 0 && size.height > 0) {
          _this.origSize = size;
        }
        return _this._setUpdatedTransform();
      }, 0);
      return this.$el;
    }