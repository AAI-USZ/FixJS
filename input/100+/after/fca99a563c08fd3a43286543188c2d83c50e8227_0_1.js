function(callback) {
    var _this = this;
    if (this.model.get("not_fetched")) {
      this.model.fetch({
        success: function() {
          _this.model.set("not_fetched", false);
          return callback();
        }
      });
    } else {
      callback();
    }
  }