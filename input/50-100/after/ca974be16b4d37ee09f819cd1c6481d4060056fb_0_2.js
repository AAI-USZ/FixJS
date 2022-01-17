function getNum() {
      var arr = ['\\d+'].concat(loc['articles']);
      if(loc['numbers']) arr = arr.concat(loc['numbers']);
      return arr.compact().join('|');
    }