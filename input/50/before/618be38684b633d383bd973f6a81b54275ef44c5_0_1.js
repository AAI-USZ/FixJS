function(chr){
    if (char == '\n' || char == '>') {
      cont += 1;
    } else {
      cont = 0;
    }
    return _ttyWrite.apply(this, arguments);
  }