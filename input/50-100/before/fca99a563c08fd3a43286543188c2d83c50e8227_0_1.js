function() {
    var _this = this;
    if (this.model.get("not_fetched")) {
      this.model.fetch({
        success: function() {
          _this.model.set("not_fetched", false);
          return _this.renderIt();
        }
      });
    } else {
      this.renderIt();
    }
    return this;
  }