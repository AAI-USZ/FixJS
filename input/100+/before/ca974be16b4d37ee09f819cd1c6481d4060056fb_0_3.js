function setArray(name, abbreviate, multiple) {
      var arr = [];
      if(!set[name]) return;
      set[name].forEach(function(el, i) {
        eachAlternate(el, function(str, j) {
          arr[j * multiple + i] = str.toLowerCase();
        });
      });
      if(abbreviate) arr = arr.concat(set[name].map(function(str) {
        return str.slice(0,3).toLowerCase();
      }));
      return set[name] = arr;
    }