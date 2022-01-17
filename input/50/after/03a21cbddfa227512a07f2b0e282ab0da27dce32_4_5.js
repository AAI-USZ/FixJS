function(err) {
  if (err) return;
  this.attr({
    y: 290,
    x: 290,
    scale: 0.5,
    filters: filter.opacity(0.5)
  });
  stage.addChild(this);
}