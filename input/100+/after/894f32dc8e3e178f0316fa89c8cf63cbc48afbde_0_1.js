f    var test, head, that, __ref;
    o.loop = true;
    this.test && (this.un
      ? this.test = this.test.invert()
      : this.anaphorize());
    if (this.post) {
      return 'do {' + this.compileBody((o.indent += TAB, o));
    }
    test = ((__ref = this.test) != null ? __ref.compile(o, LEVEL_PAREN) : void 8) || '';
    if (!(this.update || this['else'])) {
      head = test ? "while (" + test : 'for (;;';
    } else {
      head = 'for (';
      if (this['else']) {
        head += (this.yet = o.scope.temporary('yet')) + " = true";
      }
      head += ";" + (test && ' ' + test) + ";";
      if (that = this.update) {
        head += ' ' + that.compile(o, LEVEL_PAREN);
      }
    }
    return head + ') {' + this.compileBody((o.indent += TAB, o));
  };
