function Identifier(node, resolve) {
    if (resolve === undefined)
      resolve = true;
    return function(locals, env, data) {
      var entry = env[node.name];
      if (entry.get && resolve)
        return entry.get(env, data);
      return entry;
    };
  }