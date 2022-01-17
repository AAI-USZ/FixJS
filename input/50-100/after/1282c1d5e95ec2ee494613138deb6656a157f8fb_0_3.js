function(locals, env, data, key) {
      if (typeof key == 'function')
        key = key(locals, env, data);
      if (key && content[key])
        return content[key];
      return content[defaultKey];
    }