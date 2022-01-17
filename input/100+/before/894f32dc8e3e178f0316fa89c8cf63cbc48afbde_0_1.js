f    var test, that, head, __ref;
    o.loop = true;
    this.test && (this.un
      ? this.test = this.test.invert()
      : this.anaphorize());
    if (this.post) {
      return 'do {' + this.compileBody((o.indent += TAB, o), this.test);
    }
    test = ((__ref = this.test) != null ? __ref.compile(o, LEVEL_PAREN) : void 8) || '';
    head = (that = this.update)
      ? "for (;" + (test && ' ' + test) + "; " + that.compile(o, LEVEL_PAREN)
      : test ? "while (" + test : 'for (;;';
    return head + ') {' + this.compileBody((o.indent += TAB, o));
  };
