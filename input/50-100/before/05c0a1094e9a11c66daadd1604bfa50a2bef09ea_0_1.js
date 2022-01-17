function() {
    if (!this.svg) { // lazily create the SVG overlay only when needed
      this.svg = Raphael(this.canvas[0]);
      this.svg.renderfix();
      var style = this.svg.canvas.style;
      style.position = "absolute";
    }
    return this.svg;
  }