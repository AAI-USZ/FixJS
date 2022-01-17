function(pattern) {
      if (pattern) {
        var keys = [];
        for (var i = 0, l = localStorage.length; i < l; i++) {
          var key = localStorage.key(i);
          if (key && key.match(pattern)) {
            keys.push(key);
          }
        }
        for (var i = 0, l = keys.length; i < l; i++) {
          localStorage.removeItem(keys[i]);
        }
      } else {
        localStorage.clear();
      }
    }