function() {
    this.attr({
      y: 290,
      x: 150,
      scale: 0.5,
      filters: filter.contrast(2)
    });
    stage.addChild(this);
  }