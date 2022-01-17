function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }