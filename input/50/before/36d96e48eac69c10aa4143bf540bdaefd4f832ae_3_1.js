function (err, res) {
      if (err) return fn && fn(err);
      else fn();
    }