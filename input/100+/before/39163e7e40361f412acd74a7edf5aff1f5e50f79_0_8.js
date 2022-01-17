function(plugin, name){
      _.each(plugin.callbacks, function(fn, c){
        this._observe(this.el, c, _.bind(fn, this));
      }, this);
      this[name] = _.clone(plugin);
      _.each(this[name], function(fn, p){
        if (_.isFunction(fn))
          this[name][p] = _.bind(fn, this);
      }, this);
    }