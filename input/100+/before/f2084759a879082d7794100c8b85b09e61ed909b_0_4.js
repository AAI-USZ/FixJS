function convertAsianDigits(str, key) {
    if(key != 'date' && key != 'month' && key != 'year') return str;
    return str.replace(AsianDigitReg, function(d) {
      var index = LowerAsianDigits.indexOf(d);
      return (index + 1) || '';
    });
  }