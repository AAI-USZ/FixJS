function(locals, env, data, index) {
      var key = index.shift();
      if (typeof key == 'function')
        key = key(locals, env, data);
      try {
        return content[key](locals, env, data, index);
      } catch (e) {
        return content[defaultKey](locals, env, data, index);
      }
    }