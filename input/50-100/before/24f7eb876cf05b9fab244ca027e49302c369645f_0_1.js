function() {
      var self = this;
      this.remove();
      this.unbind();
      // remove model binding
      _(this._models).each(function(m) {
          m.unbind(null, null, self);
      });
      View.viewCount--;
      delete View.views[this.cid];
    }