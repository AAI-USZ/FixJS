function(err) {
  if (err) return;
  this.attr({
    y: 430,
    x: 10,
    scale: 0.5,
    filters: filter.dropShadow([0,0,5,'#000'])
  });
  stage.addChild(this);
}