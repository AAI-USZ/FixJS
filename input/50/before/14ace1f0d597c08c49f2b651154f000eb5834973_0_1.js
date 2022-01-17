function (str, fn) {
      try {
        fn(null, $m.compile(str));
      } catch(err) {
        fn(err);
      }
    }