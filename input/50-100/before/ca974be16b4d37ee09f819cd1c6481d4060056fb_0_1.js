function getDigit(start, stop) {
      var str = '[\\d]' + (start ? '{' + start + ',' + stop + '}' : '+');
      if(set['digits']) str += '|[' + set['digits'] + ']+';
      return str;
    }