function getDigit(start, stop) {
      return '[\\d' + (set['digits'] || '') + ']' + (start ? '{' + start + ',' + stop + '}' : '+');
      //if(set['digits']) str += '|[' + set['digits'] + ']+';
      //return str;
    }