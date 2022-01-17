function(at, lines, height) {
      this.height += height;
      // The trick below is apparently too advanced for IE, which
      // occasionally corrupts this.lines (duplicating elements) when
      // it is used.
      if (ie) this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      else this.lines.splice.apply(this.lines, [at, 0].concat(lines));
      for (var i = 0, e = lines.length; i < e; ++i) lines[i].parent = this;
    }