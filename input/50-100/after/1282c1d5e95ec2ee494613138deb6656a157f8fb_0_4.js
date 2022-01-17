function(elem) {
        var part = elem(locals, env, data);
        while (typeof part !== 'string') {
          if (part instanceof Entity)
            part = part.yield(env, data);
          else
            part = part(locals, env, data);
        }
        parts.push(part);
      }