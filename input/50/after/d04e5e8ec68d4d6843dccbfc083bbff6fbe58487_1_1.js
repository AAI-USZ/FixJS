function(encoding) {
    for(var i in config.capabilities.encodings) {
      if(config.capabilities.encodings[i].toLowerCase() == encoding) return true;
    }
    return false;
  }