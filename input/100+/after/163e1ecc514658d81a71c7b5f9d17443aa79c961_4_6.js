function Green() {
  this.element=new EyedElement(this,20,20,'green.png');
  this.type='green';
  //Speed at which moving is not tiring
  equilibrumSpeed=10;
  this.selected=false;
  //Updates somesthetic sensors such as hunder and fatigue
  this.update=function(deltaTime) {
    this.element.update();
    if (this.selected) {
      document.getElementById('fatigueSensor').innerHTML=Math.round(this.getFatigue()*1000)/1000;
      document.getElementById('hungerSensor').innerHTML=Math.round(this.getHunger()*1000)/1000;
      var color=this.getColor();
//      document.getElementById('colorSensor').innerHTML='('+color.r+';'+color.g+';'+color.b+')';
      document.getElementById('colorSensorVisual').style.background='rgb('+Math.floor(color.r*255.0)+','+Math.floor(color.g*255.0)+','+Math.floor(color.b*255.0)+')';
      var smell=this.getSmell();
//      document.getElementById('smellSensor').innerHTML='('+smell.r+';'+smell.g+';'+smell.b+')';
      document.getElementById('smellSensorVisual').style.background='rgb('+Math.floor(smell.r*255.0)+','+Math.floor(smell.g*255.0)+','+Math.floor(smell.b*255.0)+')';
      document.getElementById('painSensor').innerHTML=Math.round(this.getPain()*1000)/1000;
      document.getElementById('lustSensor').innerHTML=Math.round(this.getLust()*1000)/1000;
    }
    if (this.cumulatedFatigueDistance<equilibrumSpeed*deltaTime) this.cumulatedFatigueDistance=0
    else this.cumulatedFatigueDistance-=equilibrumSpeed*deltaTime;

    this.hunger+=0.02*deltaTime;
    this.pain-=0.01*deltaTime;
    if (this.pain<0) this.pain=0;
    this.lust+=0.02*deltaTime;
    if (this.lust>1) this.lust=1;
    this.age++;
  }
  this.forward=function (d) {
    this.element.forward(d*gDeltaTime);
    //Add the distance to the running count of distance
    this.cumulatedFatigueDistance+=d*deltaTime;
  }
  this.die=function() {
    this.element.changeImage('gray.png');
    this.element.eye.hide();
    this.color=4;
    this.element.color=4;
    this.type='cadaver';
  }
  this.decompose=function() {
    this.element.destroy();
  }
  this.element.color=1;

  //Add the object to the array of color dots (used by the raycast engine)
  //We store a reference to the container object of the Green inside the Green itself so we can
  //perform deletions with a O(1) performance.
  this.element.colorDotsContainer=colorDots.pushBack(this.element);
  this.hunger=0;
  this.cumulatedFatigueDistance=0;
  this.pain=0;
  this.lust=0;
  this.smell=0;
  this.rayCastCacheDate=-1;
  this.age=-1;
  //Somesthesic sensors
  this.getHunger=function() {return (this.hunger);}
  this.getFatigue=function() {return Math.min(1.035-Math.exp((-this.cumulatedFatigueDistance+300*Math.log(1.035))/300.0),1);}
  this.getPain=function() {return (this.pain);}
  this.getLust=function() {return (this.lust);}
  this.smellAttenuation=function(distance) {
    //f(0)=1
    //f(40)=0.5
    //f(1000)=0
    return (10000/((distance+100)*(distance+100))-0.0093);
  }
  this.getSmell=function() {
    if (this.contact!=null) {
      var smell=new Color((this.contact.element.color==2)?1:0,(this.contact.element.color==1)?1:0,(this.contact.element.color==3)?1:0);
      if (this.contact.element.color==4) smell=new Color(1,1,1);
    }
    else var smell=new Color(0,0,0);
    return (smell);
  }
  this.getColor=function() {
    //We store a cached copy of what the green element 'sees'. The cache lifetime is one frame
    if (this.rayCastCacheDate!=frame) {
      this.rayCastCache=rayCast(this.element);
      this.rayCastCacheDate=frame;
    }
    return (this.rayCastCache);
  }
  this.rotate=function(r) {
    this.element.rotate(r*gDeltaTime);
  }

  //Register this green element in the table of green elements held by god.js and that is used to iterate over all green elements
  registerGreen(this);
}