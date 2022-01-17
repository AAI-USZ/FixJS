function() {

  // new bezier curve
  var nb0 = new an.Curve();
  var nb1 = new an.Curve();

  /// get x //////////////////////////
  nb0.p0x = this.p0x;
  nb1.p1x = this.p1x;

  nb0.c0x = (this.p0x + this.c0x) / 2;
  nb1.c1x = (this.p1x + this.c1x) / 2;

  var x = (this.c0x + this.c1x) / 2;
  nb0.c1x = (nb0.c0x + x) / 2;
  nb1.c0x = (nb1.c1x + x) / 2;

  nb0.p1x = (nb0.c1x + nb1.c0x) / 2;
  nb1.p0x = nb0.p1x;

  /// get y //////////////////////////
  nb0.p0y = this.p0y;
  nb1.p1y = this.p1y;

  nb0.c0y = (this.p0y + this.c0y) / 2;
  nb1.c1y = (this.p1y + this.c1y) / 2;

  var y = (this.c0y + this.c1y) / 2;
  nb0.c1y = (nb0.c0y + y) / 2;
  nb1.c0y = (nb1.c1y + y) / 2;

  nb0.p1y = (nb0.c1y + nb1.c0y) / 2;
  nb1.p0y = nb0.p1y;

  return { b0: nb0, b1: nb1 };
}