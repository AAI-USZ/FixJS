function() {

  var subcurve = this.getSubCurves();

  this.p1x = subcurve.b0.p1x;
  this.p1y = subcurve.b0.p1y;
  this.c1x = subcurve.b0.c1x;
  this.c1y = subcurve.b0.c1y;

  var p = this.getPath();
  p.insertEdgeAfter(this, subcurve.b1);

}