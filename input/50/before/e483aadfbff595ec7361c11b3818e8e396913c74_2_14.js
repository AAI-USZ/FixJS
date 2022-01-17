function() {
      var ret = fn.apply(this, arguments);
      ret.prevObject = this;
      return ret;
    }