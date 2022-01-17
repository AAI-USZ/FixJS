function(err) {
  if (err) return;
  this.attr({
    y: 430,
    x: 150,
    scale: 0.5,
    filters: filter.colorMatrix([
      1, 1, 1, 0, 0,
      1, 0.7, -1, 0, 0,
      -1, -1, -1, 0, 0,
      0, 0, 0, 1, 0
    ])
  });
  stage.addChild(this);
}