function(locals, env, data, index) {
      var i = index.shift();
      if (typeof i == 'function')
        i = i(locals, env, data);
      try {
        return content[i](locals, env, data, index);
      } catch (e) {
        return content[defaultIndex](locals, env, data, index);
      }
    }