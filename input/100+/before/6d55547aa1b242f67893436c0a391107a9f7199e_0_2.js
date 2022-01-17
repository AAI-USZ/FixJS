function inquiry (query) {
    var i, I, vargs, rest = query, $, index, expression = [];
    while (rest) {
      $ = /^(\s*)(.*)$/.exec(rest), index += $[1].length;
      $ = /^(\/{1,2})(\w[\w\d]*)(\+?)(.*)/.exec(query);
      if (!$) throw new Error(error(index));
      expression.push($); 
      rest = $[4];
    }
    return function (object) {
      var vargs = slice.call(arguments, 1);
      for (i = 0, I = expression.length; i < I; i++) {
        $ = expression.shift();
        object = object[$[2]];
      }
      return [ object ];
    }
  }