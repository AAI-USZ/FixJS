function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        f(context, partials, this, indent);
      }
    }