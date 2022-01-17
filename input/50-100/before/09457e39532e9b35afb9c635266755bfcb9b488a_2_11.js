function(at, lines, height) {
      this.height += height;
      this.lines.splice.apply(this.lines, [at, 0].concat(lines));
      for (var i = 0, e = lines.length; i < e; ++i) lines[i].parent = this;
    }