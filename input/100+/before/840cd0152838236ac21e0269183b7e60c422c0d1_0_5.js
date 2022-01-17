function(fn) {
      var incorrect_args, m, t;
      m = ["tron.subscribe( fn ) was expecting fn to", "but got"];
      t = typeof fn;
      if (t !== 'list' && t !== 'function') {
        throw "" + m[0] + " be a function " + m[1] + " " + t + ".";
      }
      incorrect_args = true;
      switch (fn.length) {
        case 0:
          if (/arguments/.test(fn.toString())) incorrect_args = false;
          break;
        case 2:
          incorrect_args = false;
      }
      if (incorrect_args) {
        throw "" + m[0] + " have 2 arguments " + m[1] + " " + fn.length + " argument(s)";
      }
    }