function getNum() {
      var arr = [getDigit()].concat(set['articles']);
      if(set['numbers']) arr = arr.concat(set['numbers']);
      return arr.compact().join('|');
    }