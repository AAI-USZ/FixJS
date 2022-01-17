function(func, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          return this.ls(result, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return result;
    }