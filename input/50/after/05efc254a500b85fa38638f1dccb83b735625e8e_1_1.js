function(key, value) {
        if(!multiMatch(el[key], match[key], scope, [el[key], el])) {
          result = false;
        }
      }