function prepareTime(format, loc) {
    var sep = [':'], add, timeSuffixMapping = {h:0,m:1,s:2};
    if(!loc) loc = Date.getLocale('en');
    return format.replace(/{([a-z]+)}/g, function(full, token) {
      if(token == 'meridian') {
        return loc['12hr'].join('|');
      } else {
        add = loc['timeSuffixes'][timeSuffixMapping[token]];
        return '(?:'+ (add ? sep.concat(add) : sep).join('|') +')?';
      }
    });
  }