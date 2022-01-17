function setArray(name, abbreviate, multiple) {
      var arr = [];
      if(!loc[name]) return;
      loc[name].forEach(function(el, i) {
        eachAlternate(el, function(str, j) {
          arr[j * multiple + i] = str.toLowerCase();
        });
      });
      if(abbreviate) arr = arr.concat(loc[name].map(function(str) {
        return str.slice(0,3).toLowerCase();
      }));
      return loc[name] = arr;
    }