function memoize(deref, name, ast, top) {
      var tmp;
      if (deref) {
        return this;
      } else {
        tmp = this.copyWith("$m || ($m = (" + this.main + "))").lazy(name, ast, top);
        return tmp.copyWith("(function(){var $m; return " + tmp.main + "})()");
      }
    }