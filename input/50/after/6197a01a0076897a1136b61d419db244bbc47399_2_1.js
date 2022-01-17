function Item_setRotation(degrees) {
    var value = degrees ? "rotate(%deg)".replace(/%/, degrees) : null;
    iQ(this.container).css({"transform": value});
  }