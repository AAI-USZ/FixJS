function(options) {
      Backbone.View.call(this, options);
      this._models = [];
      View.viewCount++;
      View.views[this.cid] = this;
      this._created_at = new Date();
    }