function css(el) {
    eachPair(arguments, function(n, val) {
      el[style][vendor(el, n)||n] = val;
    });
    return el;
  }