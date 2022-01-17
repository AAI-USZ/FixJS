function(x, y, depth, margin, minSize) {

  // calculate the boundary including control points
  var rect = this.getSurroundingRect();

  // consider the margin
  rect.x -= margin;
  rect.w += margin * 2;
  rect.y -= margin;
  rect.h += margin * 2;

  if(! this.inRect(x, y, rect) ) return false;

  if( this.smallEnough(rect, minSize) ) return true;

  // give up if the recursion gets too deep.
  if( depth < 0 ) {
    return false;
  }

  var subBezier = this.getSubCurves();
  if( (subBezier.b0.onSubCurve(x, y, depth - 1, margin, minSize)) ||
      (subBezier.b1.onSubCurve(x, y, depth - 1, margin, minSize)) ) {
    return true;
  }

  return false;

}