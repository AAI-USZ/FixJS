function safeMove(mobile,x,y) {
  //console.log('safeMove '+x+' '+y);
  var oldPosition=new Vector();
  oldPosition.x=mobile.x;
  oldPosition.y=mobile.y;
  mobile.x=x;
  mobile.y=y;
  mobile.parent.contact=null;

  ret=getNearestObject(mobile.parent);
  if (ret.distance<0) {
    var a=new Vector(); //Corresponds to the vector AB that goes from the current object to the other object
    a.x=ret.nearestObject.element.x-mobile.x;
    a.y=ret.nearestObject.element.y-mobile.y;
    a.normalize();
    a.multiply(ret.distance);
    mobile.x+=a.x;
    mobile.y+=a.y;

    mobile.parent.contact=ret.nearestObject;
  }
}