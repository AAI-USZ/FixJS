function prepareTime(format, loc) {
    var timeSuffixMapping = {h:0,m:1,s:2}, add;
    loc = loc || English;
    return format.replace(/{([a-z])}/g, function(full, token) {
      if(token === 't') {
        return loc['12hr'].join('|');
      } else if (add = loc['timeSuffixes'][timeSuffixMapping[token]]) {
        return token === 'h' ? add : '(?:'+ add +')?';
      } else {
        return '';
      }
    });
  }