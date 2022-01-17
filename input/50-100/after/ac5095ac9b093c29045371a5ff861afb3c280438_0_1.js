function() {
      var result = []
      multiArgs(arguments, function(a) {
        if(a && a.callee) a = multiArgs(a);
        result = result.concat(a);
      });
      return result;
    }