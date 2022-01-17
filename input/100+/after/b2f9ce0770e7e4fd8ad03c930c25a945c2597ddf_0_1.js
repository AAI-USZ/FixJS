function() {
    var topic = expect(this.target),
        keys = Object.keys(this.expects),
        rs = {},
        i, l, key, exp;
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      exp = this.expects[key];
      if (exp instanceof Topic) {
        rs[key] = exp.apply(topic);
      } else if (typeof exp === 'function') {
        rs[key] = exp(this.target);
      } else {
        rs[key] = exp;
      }
    }
    return rs;
  }