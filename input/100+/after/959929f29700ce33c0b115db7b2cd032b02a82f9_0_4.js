function(options) {
      (options || (options = {})).unset = true;
      return this.set(_.clone(this.attributes), options);
    }