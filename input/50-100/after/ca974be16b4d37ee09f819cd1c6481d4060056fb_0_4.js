function(full, token) {
      if(token == 'meridian') {
        return loc['12hr'].join('|');
      } else {
        add = loc['timeSuffixes'][timeSuffixMapping[token]];
        return '(?:'+ (add ? sep.concat(add) : sep).join('|') +'\\s*)?';
      }
    }