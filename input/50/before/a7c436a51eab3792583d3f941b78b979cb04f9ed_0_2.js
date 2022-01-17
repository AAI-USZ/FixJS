function (val) {
        return !matcher.test(val)
          ? prefix + val
          : val;
      }