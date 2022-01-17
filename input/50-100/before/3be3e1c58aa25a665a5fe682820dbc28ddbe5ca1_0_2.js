function getNum() {
      var arr = [getDigit()].concat(set['articles']);
      console.info('hrmmmmmmmmmm', set['numbers']);
      if(set['numbers']) arr = arr.concat(set['numbers']);
      return arr.compact().join('|');
    }