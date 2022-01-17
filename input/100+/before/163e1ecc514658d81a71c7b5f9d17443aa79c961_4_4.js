function(deltaTime) {
    this.element.update();
    if (this.selected) {
      document.getElementById('fatigueSensor').innerHTML=Math.round(this.getFatigue()*1000)/1000;
      document.getElementById('hungerSensor').innerHTML=Math.round(this.getHunger()*1000)/1000;
      var color=this.getColor();
      document.getElementById('colorSensor').innerHTML='('+color.r+';'+color.g+';'+color.b+')';
      document.getElementById('colorSensorVisual').style.background='rgb('+Math.floor(color.r*255.0)+','+Math.floor(color.g*255.0)+','+Math.floor(color.b*255.0)+')';
      if (this.contact!=null) {
        var smell=new Color((this.contact.element.color==2)?1:0,(this.contact.element.color==1)?1:0,(this.contact.element.color==3)?1:0);
      }
      else var smell=new Color(0,0,0);
      document.getElementById('smellSensor').innerHTML='('+smell.r+';'+smell.g+';'+smell.b+')';
      document.getElementById('smellSensorVisual').style.background='rgb('+Math.floor(smell.r*255.0)+','+Math.floor(smell.g*255.0)+','+Math.floor(smell.b*255.0)+')';
    }
    if (this.cumulatedFatigueDistance<equilibrumSpeed*deltaTime) this.cumulatedFatigueDistance=0
    else this.cumulatedFatigueDistance-=equilibrumSpeed*deltaTime;

    this.hunger+=0.02*deltaTime;
  }