function(el, i, arr) {
      if(multiMatch(el, f, arr, [i, arr])) {
        result = el;
        index = i;
        return false;
      }
    }