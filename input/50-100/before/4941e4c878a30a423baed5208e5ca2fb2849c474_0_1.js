function(x,y) {
      this.set({"x": x, "y": y}, {silent: true});
      this.glyphs.text.attr("x", x);
      this.glyphs.text.attr("y", y);
    }