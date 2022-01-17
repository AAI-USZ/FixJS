function get(env, data, index) {
      if (index === undefined)
        var index = this.index;
      var ret = this.yield(env, data, index.shift());
      while (typeof ret !== 'string') {
        ret = ret({ __this__: this }, env, data, index.shift());
      }
      return ret;
    }