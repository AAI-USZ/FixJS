function(msg, info) {
      if(calls[msg]) {
        throw msg + " triggered more than once";
      }
      calls[msg] = info || true;

      cb && cb.apply(null, arguments);
    }