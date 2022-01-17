function(pos) {
  if(pos < 0 || this.items.length <= pos) // position is out of bounds
    return;
  this.parallax.commit(pos * this.itemWidth());
  this.position = pos;
}