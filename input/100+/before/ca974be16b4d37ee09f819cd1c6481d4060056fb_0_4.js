function setModifiers() {
      var arr = [];
      set.modifiersByName = {};
      set['modifiers'].each(function(modifier) {
        eachAlternate(modifier.src, function(t) {
          set.modifiersByName[t] = modifier;
          arr.push({ name: modifier.name, src: t, value: modifier.value });
        });
      });
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(set['weekdays']);
        set[name] = group.join('|');
      });
      set['modifiers'] = arr;
    }