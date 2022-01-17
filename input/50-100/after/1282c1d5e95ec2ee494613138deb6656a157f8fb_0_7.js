function get(locals, env, data, index) {
      if (index === undefined)
        var index = locals['__this__'].index;
      var ret = this.yield(locals, env, data, index.shift());
      while (typeof ret !== 'string') {
        ret = ret(locals, env, data, index.shift());
      }
      return ret;
    }