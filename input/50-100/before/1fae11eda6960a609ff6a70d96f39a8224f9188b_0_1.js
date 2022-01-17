function(v, k) {
        var combination = {};
        if(paramsParsed) {
          // An object passed
          combination.expression = v;
          combination.keys = k;
        } else {
          // A string passed
          v = v.split(/\s+on\s+/i);
          combination.expression = v[0];
          combination.keys = v[1];
        }
        combination.keys = combination.keys.split('-');
        combinations.push(combination);
      }