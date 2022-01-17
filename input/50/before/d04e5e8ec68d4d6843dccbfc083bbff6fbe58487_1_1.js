function(encoding) {
    for(var i in config.capabilities.encodings) {
      if(config.capabilities.encodings[i].toLowerCase() == type) return true;
    }
    return false;
  }