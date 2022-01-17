function inquiry (query) {
    var i, I, vargs, rest = query, $, index, expression = [];
    while (rest) {
      $ = /^(\s*)(.*)$/.exec(rest), index += $[1].length;
      $ = /^(\/{1,2})([\w\*][\*\w\d]*)(\+?)(.*)/.exec(query);
      if (!$) throw new Error(error(0));
      expression.push($); 
      rest = $[4];
    }
    return function (object) {
      var vargs = slice.call(arguments, 1), star, name, key;
      for (i = 0, I = expression.length; i < I; i++) {
        $ = expression.shift(), name = $[2];
        if (~(star = name.indexOf('*'))) {
          for (key in object) {
            if (key.indexOf(name.substring(0, star)) == 0
                && key.lastIndexOf(name.substring(star + 1) == key.length - (name.length - star))) {
              object = object[key];
              break;
            }
          }
        } else {
          object = object[name];
        }
      }
      return [ object ];
    }
  }