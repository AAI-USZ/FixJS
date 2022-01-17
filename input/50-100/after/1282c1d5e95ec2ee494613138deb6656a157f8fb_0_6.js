function(locals, env, data) {
      var ret = expression(locals, env, data);
      if (ret instanceof Entity)
        return ret.yield(env, data, property);
      if (ret instanceof Attribute)
        return ret.yield(locals, env, data, property);
      // else, `expression` is a HashLiteral
      return ret(locals, env, data, property);
    }