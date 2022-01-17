function() {
    this.attr({
      y: 290,
      x: 10,
      scale: 0.5,
      filters: filter.brightness(2)
    });
    stage.addChild(this);
  }