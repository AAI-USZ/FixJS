function(o){
    var head, tails, t, hasPartial, pre, rest, partial, post, that, base, news, __i, __len, __ref;
    if (this.flip) {
      util('flip');
      util('curry');
    }
    head = this.head, tails = this.tails;
    head.front = this.front;
    head.newed = this.newed;
    for (__i = 0, __len = tails.length; __i < __len; ++__i) {
      t = tails[__i];
      if (t.partialized) {
        hasPartial = true;
        break;
      }
    }
    if (hasPartial) {
      util('slice');
      __ref = breakIt(function(it){
        return it.partialized != null;
      }, tails), pre = __ref[0], rest = __ref[1];
      if (rest != null) {
        __ref = splitAt(1, rest), partial = __ref[0], post = __ref[1];
      }
      partial = partial[0];
      this.tails = pre;
      return Chain(Chain(Var(util('partialize'))).add(Call([this, Arr(partial.args), Arr(partial.partialized)])), post).compile(o);
    }
    if (!tails.length) {
      return head.compile(o);
    }
    if (that = this.unfoldAssign(o)) {
      return that.compile(o);
    }
    if (tails[0] instanceof Call && !head.isCallable()) {
      this.carp('invalid callee');
    }
    this.expandSlice(o);
    this.expandBind(o);
    this.expandSplat(o);
    this.expandStar(o);
    if (!this.tails.length) {
      return this.head.compile(o);
    }
    base = this.head.compile(o, LEVEL_CALL);
    news = rest = '';
    for (__i = 0, __len = (__ref = this.tails).length; __i < __len; ++__i) {
      t = __ref[__i];
      if (t['new']) {
        news += 'new ';
      }
      rest += t.compile(o);
    }
    if ('.' === rest.charAt(0) && SIMPLENUM.test(base)) {
      base += ' ';
    }
    return news + base + rest;
  }