function(deltaTime) {
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

    this.hunger+=hungerEvolution*deltaTime;
    this.pain-=0.01*deltaTime;
    if (this.pain<0) this.pain=0;
    this.lust+=lustEvolution*deltaTime;
    if (this.lust>1) this.lust=1;
    this.age++;
  }