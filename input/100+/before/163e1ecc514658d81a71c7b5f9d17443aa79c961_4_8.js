function rayCastNarrowPhase(casterDot,receiverDot,ray) {
  var iterations=1;
  var minDist2=999999;
  move=function(x,y) {
    var bakx=receiverDot.x;
    var baky=receiverDot.y;
    receiverDot.x+=x;
    receiverDot.y+=y;
    var d2=distanceToRay2(casterDot,receiverDot,ray);
    receiverDot.x=bakx;
    receiverDot.y=baky;
    return (d2);
  }
  var minIX, minIY;
  var minPos=new function() {this.x=0; this.y=0;};
  //Shift the scene several time to be able to detect an object that is on the other side of an edge
  for (var ix=-iterations; ix<=iterations; ix++) {
    for (var iy=-iterations; iy<=iterations; iy++) {
      var d2=move(ix*width,iy*height);
      if (d2<minDist2) {
        minDist2=d2;
        minIX=ix;
        minIY=iy;
        minPos.x=receiverDot.x+width*ix;
        minPos.y=receiverDot.y+height*iy;
      }
    }
  }
  var dist2=minDist2;
  var isOnRay=false;
  var distanceOnRay2=999999;
  if (dist2<=receiverDot.radius*receiverDot.radius) {
    distanceOnRay2=distance2(casterDot,minPos);
    isOnRay=true;
  }
  else if (distance2(casterDot.element,receiverDot.element)<Math.pow(receiverDot.radius+casterDot.radius,2)) {
    distanceOnRay2=0;
    isOnRay=true;
  }

  return new function() {this.isOnRay=isOnRay; this.distance2=distanceOnRay2;};
}