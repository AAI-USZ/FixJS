function() {
    this.clearEverything();
    this.recalibrateHeatmap();
    this.context.translate(this.o_x, this.o_y);
    this.scaleContext.translate(this.o_x, this.o_y);
    this.drawStatusBar();
    this.drawGrid();
  }