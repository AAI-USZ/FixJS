function (str, fn) {
      try {
        fn(null, $m.parse(str));
      } catch(err) {
        fn(err);
      }
    }