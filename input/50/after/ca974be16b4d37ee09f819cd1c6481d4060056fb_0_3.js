function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(loc['weekdays']);
        loc[name] = group.join('|');
      }