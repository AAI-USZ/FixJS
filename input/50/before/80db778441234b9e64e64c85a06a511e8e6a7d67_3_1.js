function(msg, info) {
      if(calls[msg]) {
        throw msg + " triggered more than once";
      }
      calls[msg] = true;

      cb && cb.apply(null, arguments);
    }