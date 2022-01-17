function(fn, c){
        this._observe(this.el, c, _.bind(fn, this));
      }