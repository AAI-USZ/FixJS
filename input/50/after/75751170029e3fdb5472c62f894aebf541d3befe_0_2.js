function (val, prefix) {
        var matcher = new RegExp('^' + prefix + '(.*)');
        return !matcher.test(val)
          ? prefix + val
          : val;
      }