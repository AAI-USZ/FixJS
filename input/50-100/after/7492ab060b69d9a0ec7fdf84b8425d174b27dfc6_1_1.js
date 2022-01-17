function(name, normalize) {
    if (name.substr(name.length - 1, 1) == '!') {
      return normalize(name.substr(0, name.length - 1)) + '!';
    }
    return normalize(name);
  }