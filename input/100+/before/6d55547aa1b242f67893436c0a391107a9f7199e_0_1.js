function (object) {
      var vargs = slice.call(arguments, 1);
      for (i = 0, I = expression.length; i < I; i++) {
        $ = expression.shift();
        object = object[$[2]];
      }
      return [ object ];
    }