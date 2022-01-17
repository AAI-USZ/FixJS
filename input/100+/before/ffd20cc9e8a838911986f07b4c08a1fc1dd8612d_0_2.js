function(pattern) {
      if (pattern) {
        for (var i = 0, l = localStorage.length; i < l; i++) {
          var key = localStorage.key(i);
          if (key && key.match(pattern)) {
            localStorage.removeItem(key);
          }
        }
      } else {
        localStorage.clear();
      }
    }