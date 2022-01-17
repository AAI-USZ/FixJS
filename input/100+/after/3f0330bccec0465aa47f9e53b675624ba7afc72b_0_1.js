function(s, sign, dest) {
    if (!s || onePattern.test(s)) return dest;
    
    var first = true;
    while (s) {
      var match = termPattern.exec(s);
      if (!match) throw 'Invalid term starting at \"' + s + '\"';
      if (first) {
        if (match[1]) throw 'Unexpected "*" before other terms';
        first = false;
      } 
      var unit = match[2];
      var exponent = parseInt(match[3],10) || 1;
      dest[unit] = (dest[unit]||0) + exponent*sign;
      s = s.substring(match[0].length);
    }
    
    return dest;
  }