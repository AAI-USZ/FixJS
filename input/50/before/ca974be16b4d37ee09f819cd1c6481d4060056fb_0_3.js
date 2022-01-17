function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(set['weekdays']);
        set[name] = group.join('|');
      }