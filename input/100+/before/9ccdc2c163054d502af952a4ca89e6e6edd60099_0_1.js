function(key, ctx, partials, returnFound) {
    var names = null,
        val = null,
        result = null,
        cx = null;

    if (key === '.') {
      return ctx[ctx.length - 1];
    }

    names = key.split('.');
    val = this.f(names[0], ctx, partials, returnFound);
    for (var i = 1; i < names.length; i++) {
      result = getValue(val, names[i]);
      if (result.found) {
        cx = val;
        val = result.val;
      }
      else {
        val = '';
        break;
      }
    }

    if (returnFound && !val) {
      return false;
    }

    if (!returnFound && typeof val === 'function') {
      ctx.push(cx);
      val = this.mv(val, ctx, partials);
      ctx.pop();
    }

    return val;
  }