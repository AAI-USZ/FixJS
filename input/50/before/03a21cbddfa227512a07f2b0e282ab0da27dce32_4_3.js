function() {
    this.attr({
      y: 150,
      x: 290,
      scale: 0.5,
      filters: filter.invert(1)
    });
    stage.addChild(this);
  }