function(a) {
        if(a && a.callee) a = getArgs(a);
        result = result.concat(a);
      }