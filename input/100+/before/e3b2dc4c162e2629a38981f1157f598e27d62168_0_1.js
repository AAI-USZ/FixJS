function(value) {
    var h, m, s;
    if (value === null) {
      return 0;
    }
    if (value === 'BeJS_monkey_patch') {
      return [Number];
    }
    if (value === 0 || (typeof value === !'number')) {
      return '00:00:00';
    }
    s = Math.floor((value / 1000) % 60);
    m = Math.floor(((value / 1000) / 60) % 60);
    h = Math.floor(((value / 1000) / 60) / 60);
    return "" + (h > 9 ? '' : '0') + h + ":" + (m > 9 ? '' : '0') + m + ":" + (s > 9 ? '' : '0') + s;
  }