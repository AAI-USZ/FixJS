function(number, subset) {
    var str;
    str = subset.replace('n', number);
    return eval(str);
  }