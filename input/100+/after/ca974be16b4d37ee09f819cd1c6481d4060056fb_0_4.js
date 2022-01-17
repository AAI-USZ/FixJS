function setModifiers() {
      var arr = [];
      loc.modifiersByName = {};
      loc['modifiers'].each(function(modifier) {
        eachAlternate(modifier.src, function(t) {
          loc.modifiersByName[t] = modifier;
          arr.push({ name: modifier.name, src: t, value: modifier.value });
        });
      });
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(loc['weekdays']);
        loc[name] = group.join('|');
      });
      loc['modifiers'] = arr;
    }