function() {
      if (--times < 1) { return func.apply(this, arguments); }
    }