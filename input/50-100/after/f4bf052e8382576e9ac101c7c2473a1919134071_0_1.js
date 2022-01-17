function (key) {
    if(item[key] && typeof item[key] === 'object' && !Array.isArray(item[key])) {
      Object.keys(item[key]).forEach(function (k) {
        if(k[0] == '$') {
          commands[key] = item[key];
        }
      })
    }
  }