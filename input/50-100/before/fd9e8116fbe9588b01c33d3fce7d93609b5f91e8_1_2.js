function getNum() {
      var arr = [getDigit()].concat(set['articles']);
      if(!set['digits']) arr = arr.concat(set['numbers']);
      return arr.compact().join('|');
    }