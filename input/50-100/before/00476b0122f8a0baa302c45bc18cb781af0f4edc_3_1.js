function(place, sign, base) {
      var num = this, str = num.abs().toString(base || 10);
      str = repeatString(place - str.replace(/\.\d+/, '').length, '0') + str;
      if(sign || num < 0) {
        str = (num < 0 ? '-' : '+') + str;
      }
      return str;
    }