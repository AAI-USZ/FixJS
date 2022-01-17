function getDigit(start, stop) {
      var str = '\\d{' + start + ',' + stop + '}';
      if(loc['digits']) str += '|[' + loc['digits'] + ']+';
      return str;
    }