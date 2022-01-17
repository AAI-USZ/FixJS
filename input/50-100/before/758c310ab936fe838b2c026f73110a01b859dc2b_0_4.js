function() {
    if (this.pipeless) {
      if ('\n' == this.input[0]) return;
      var i = this.input.indexOf('\n');
      if (-1 == i) i = this.input.length;
      var str = this.input.substr(0, i);
      this.consume(str.length);
      return this.tok('text', str);
    }
  }