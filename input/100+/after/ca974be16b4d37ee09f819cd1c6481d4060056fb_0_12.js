function prepareTime(format, loc) {
    var sep = [':'], add, timeSuffixMapping = {h:0,m:1,s:2};
    loc = loc || English;
    return format.replace(/{([a-z]+)}/g, function(full, token) {
      if(token == 'meridian') {
        return loc['12hr'].join('|');
      } else {
        add = loc['timeSuffixes'][timeSuffixMapping[token]];
        return '(?:'+ (add ? sep.concat(add) : sep).join('|') +'\\s*)?';
      }
    });
  }