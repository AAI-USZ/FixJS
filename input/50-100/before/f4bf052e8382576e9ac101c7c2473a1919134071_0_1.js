function (key) {
    if(typeof item[key] === 'object') {
      Object.keys(item[key]).forEach(function (k) {
        if(k[0] == '$') {
          commands[key] = item[key];
        }
      })
    }
  }