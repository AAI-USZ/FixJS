function rayCast(casterDot) {
  var timeBefore=time();  //performance benchmark (DELETEME in final version)
  var ray=new Vector();
  //We add 270 each time because in our engine 0° means north but for trig functions, 0° means east
  ray.x=Math.cos(rad(casterDot.rotation+270));  //TODO tabulate these functions
  ray.y=Math.sin(rad(casterDot.rotation+270));
  //We also need to pass the angle to the raycast broadphase
  ray.angle=(casterDot.rotation)%360; //0=up, 90=left

  var ret=rayCastBroadPhase(casterDot,ray);
  var color=ret.color;
  var rgbColor=new Color((color==2)?1:0,(color==1)?1:0,(color==3)?1:0);

  rgbColor.setSaturation(1-Math.sqrt(ret.distance2)/200);

  return (rgbColor);
}