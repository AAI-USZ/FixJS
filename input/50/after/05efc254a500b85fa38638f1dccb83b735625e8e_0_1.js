function(el, i, arr) {
        if(multiMatch(el, f, arr, [el, i, arr])) {
          result.push(el);
        }
      }