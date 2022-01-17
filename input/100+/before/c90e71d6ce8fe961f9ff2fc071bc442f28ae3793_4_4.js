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
    if (ret.nearestObject.element.x==mobile.x && ret.nearestObject.element.y==mobile.y) return;
    //console.log('Found an object with intersection '+ret.distance+'. Its position is ('+ret.nearestObject.element.x+';'+ret.nearestObject.element.y+'). Our position is ('+x+';'+y+')');
    //The 'ghost' is colliding with something
    /*var m=new Vector(); //m for motion (normalized)
    m.x=x-oldPosition.x;
    m.y=y-oldPosition.y;
    m.normalize();
    var a=new Vector(); //Corresponds to the vector AB that goes from the current object to the other object
    a.x=ret.nearestObject.element.x-mobile.x;
    a.y=ret.nearestObject.element.y-mobile.y;
    var am=a.dot(m);
    var am2=am*am;
    var rt=mobile.radius+ret.nearestObject.element.radius;
    var rt2=rt*rt;
    var a2=a.dot(a);
    var delta=4*am2+4*(rt2-a2);
    var sqrdelta=Math.sqrt(delta);
    var k=(-2*am+sqrdelta)/2;
    //Test if k<0
    m.multiply(-k);
    mobile.x+=m.x;
    mobile.y+=m.y;*/

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