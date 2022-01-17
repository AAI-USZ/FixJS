function(o){
    var head, tails, lastTail, args, code, i, a, that, base, rest, news, t, __len, __i, __ref;
    if (this.flip) {
      util('flip');
      util('curry');
    }
    head = this.head, tails = this.tails;
    head.front = this.front;
    head.newed = this.newed;
    lastTail = tails[tails.length - 1];
    if (lastTail instanceof Call && lastTail.partialized) {
      tails.pop();
      util('slice');
      args = lastTail.args;
      code = util('partialize') + "(" + this.compile(o, LEVEL_LIST) + ", [";
      for (i = 0, __len = args.length; i < __len; ++i) {
        a = args[i];
        code += (i ? ', ' : '') + a.compile(o, LEVEL_LIST);
      }
      code += "], [" + lastTail.partialized.toString() + "])";
      return code;
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