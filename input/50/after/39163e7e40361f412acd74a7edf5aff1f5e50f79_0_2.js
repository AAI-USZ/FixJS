function(fn, c){
        this.observe(this.el, c, _.bind(fn, this));
      }