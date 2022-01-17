function getOptionalSpacing(src) {
    var optionalReg = /^{\d|.+\?}$/, tmp = '', optional, lastWasOptional;
    src.split(' ').each(function(token, i) {
      optional = !!token.match(optionalReg);
      if(i > 0) {
        tmp += '[-,. ]' + (optional || lastWasOptional ? '*' : '+');
      }
      tmp += token;
      lastWasOptional = optional;
    });
    return tmp;
  }