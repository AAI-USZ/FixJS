function(locals, env, data) {
      var entity = expression(locals, env, data);
      //if (!entity instanceof Entity)
      //  throw "Expression does not evaluate to a valid entity."
      return entity.getAttribute(attribute, env, data);
    }