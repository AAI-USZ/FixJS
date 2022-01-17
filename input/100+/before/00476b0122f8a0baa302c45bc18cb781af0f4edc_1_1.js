function setModifiers() {
      var arr = [];
      loc.modifiersByName = {};
      loc['modifiers'].forEach(function(modifier) {
        var name = modifier.name;
        eachAlternate(modifier.src, function(t) {
          var locEntry = loc[name];
          loc.modifiersByName[t] = modifier;
          arr.push({ name: name, src: t, value: modifier.value });
          loc[name] = locEntry ? locEntry + '|' + t : t;
        });
      });
      loc['day'] += '|' + arrayToAlternates(loc['weekdays']);
      console.info(loc);
      /*
      console.info(arr);
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(loc['weekdays']);
        loc[name] = group.join('|');
      });
      */
      loc['modifiers'] = arr;
    }