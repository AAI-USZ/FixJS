function(locals, env, data) {
      var entry = env[node.name];
      if (entry.get && resolve)
        return entry.get(env, data);
      return entry;
    }