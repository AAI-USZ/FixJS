function updateGod(deltaTime) {
  gDeltaTime=deltaTime; //This global variable will be used by the user-functions such as Green.forward
  var updateGodStart=time();
  var greenPeopleUpdateTime=0;
  var greenPeopleCollTime=0;
  var timeStart=0;
  //Update all green spots
  for (var green=listOfGreenPeople.first; green!=null; green=green.next) {
    timeStart=time();
    //TODO send signal to red spot if hit
    green.data.update(deltaTime);
    ia_green_update(green.data);
    greenPeopleUpdateTime+=time()-timeStart;

    timeStart=time();
    //Test collisions
    //This is legacy, but it pretty much get the contacted object (that was determined during the collision solving)
    //This means that an object can only touch one other object at the time (FIXME/TESTME ?)
    var ret=new function() {this.distance=(green.data.contact==null)?1:-1; this.nearestObject=green.data.contact;};
    //LEGACY var ret=getNearestObject(green.data);
    if (ret.distance<0) {
      //Collision with water -> drink it
      if (ret.nearestObject.type=='water') {
        if (ret.nearestObject.element.radius>0 && green.data.hunger-drinkFactor*deltaTime>0) green.data.hunger-=drinkFactor*deltaTime;
        ret.nearestObject.changeRadius(-5*deltaTime);
        //If the water spot gets really small, delete it (to avoid having many very-small water spots on the scene, because they can't be detected by the eye
        if (ret.nearestObject.element.radius<3) {
          listOfWaterSpots.remove(ret.nearestObject.waterSpotsContainer);
          colorDots.remove(ret.nearestObject.element.colorDotsContainer);
          getMatrixCell(ret.nearestObject.element.x,ret.nearestObject.element.y).remove(ret.nearestObject.matrixContainer);
          ret.nearestObject.destroy();
        }
      }
      //Collision with red -> feed it and die (slowly :p)
      else if (ret.nearestObject.type=='red') {
        if (ret.nearestObject.hunger-eatFactor*deltaTime>0) {
          //By managing every collision from the 'green' update loop, we prevent any collision detection that does not involve a green element, but we significantly increase performance
          ret.nearestObject.hunger-=eatFactor*deltaTime;
          //TODO for the moment we do not use the 'pain' property of the green, we make it more hungry when it touches a red element
          green.data.hunger+=killFactor*deltaTime;
        }
        else ret.nearestObject.hunger=0;
      }
      //Collision with other green -> make babies
      else if (ret.nearestObject.type=='green') {
        var green1=green.data;
        var green2=ret.nearestObject;
        //TODO we could use this random factor to limit the baby-boom, but for the moment it is pretty good
        //It is possible (in theory) to change these '0.4' values but it is risky since the 'lust' property is not used and babies could spawn exponentially
        if (Math.random()<1 && green1.hunger<0.4 && green2.hunger<0.4) {
          var green3=new Green();
          //In theory, this big leap will be solved automatically, even if the baby (obviously overlaps the parent)
          //However, the fact that two elements are at the exact same position makes it difficult for the raycast to do its job, so we shift the baby of a few pixels
          //  (but maybe it was only true with the new broadphase algorithm ?)
          green3.element.move(green1.element.x+2,green1.element.y+2);
          //Making babies make the green elements hungry, or they would create babies exponentially since the 'lust' is not used
          green1.hunger+=0.4;
          green2.hunger+=0.4;
          green3.element.rotate(Math.random()*360);
          green3.hunger=0.5;
          ia_green_init(green3);
        }
      }
    }
    greenPeopleCollTime+=time()-timeStart;  //Benchmark

    //If the green elements is dying of hunger
    if (green.data.getHunger()>1.0) {
      aliveGreens--;
      listOfGreenPeople.remove(green);
      //TODO create a queue of dead elements, set a timer to a 0.1s after the front element should be popped
      //colorDots.remove(green.data.element.colorDotsContainer);
      //getMatrixCell(green.data.element.x,green.data.element.y).remove(green.data.matrixContainer);
      green.data.die(); //TODO delete sprite
      green.data.decompositionDate=time()+decompositionTime;
      listOfCadavers.pushBack(green.data);
      if (listOfCadavers.length==1) {
        setTimeout(manageCadavers,decompositionTime*1000+100);
      }
      continue;
    }
  }
  
  timeStart=time();
  //Update all red spots
  for (var red=listOfRedPeople.first; red!=null; red=red.next) {
    red.data.update(deltaTime);
    ia_red_update(red.data);
  
    //If the red is full, then it will make a baby
    if (red.data.getHunger()<0.03) {
      var red3=new Red();
      red3.element.move(red.data.element.x,red.data.element.y);
      red.data.hunger+=0.6;
      red3.element.rotate(Math.random()*360);
      red3.hunger=0.6;
      ia_red_init(red3);
    }

    //The red is dying of hunger
    if (red.data.getHunger()>1) {
      aliveReds--;
      listOfRedPeople.remove(red);
      //colorDots.remove(red.data.element.colorDotsContainer);
      //getMatrixCell(red.data.element.x,red.data.element.y).remove(red.data.matrixContainer);
      red.data.die();
      red.data.decompositionDate=time()+decompositionTime;
      listOfCadavers.pushBack(red.data);
      if (listOfCadavers.length==1) {
        setTimeout(manageCadavers,decompositionTime*1000+100);
      }
      continue;
    }
  }
  var redPeopleUpdateTime=time()-timeStart;
  //console.log('greenPeopleUpdateTime='+Math.round(greenPeopleUpdateTime*1000)+' greepPeopleCollTime='+Math.round(greenPeopleCollTime*1000)+' redPeopleUpdateTime='+Math.round(redPeopleUpdateTime*1000)+' updateGodTime='+Math.round((time()-updateGodStart)*1000));

  /* Rain */
  if (Math.random()<rainFactor) {
    var w=new Water();
    w.element.move(Math.random()*width,Math.random()*height);
  }

  if (frame%10==0) {
    document.getElementById('info').innerHTML=listOfGreenPeople.length+' greens, '+listOfRedPeople.length+' reds, '+Math.round(1.0/deltaTime)+' fps and '+Math.round(100*colorDots.length/(matrixW*matrixH))/100+' color dots per cell. We got an average q='+Math.round(100*qsum/qcount)/100+'. Performed '+gNarrowPhases+' narrow phases ('+gNarrowPhases_+' successful), plus '+gNarrowPhases2+' ('+gNarrowPhases2_+' successful) after finding a first match, which makes '+(gNarrowPhases+gNarrowPhases2)+' narrow phases in total.\n';
    document.getElementById('debug2').value+=listOfGreenPeople.length+','+listOfRedPeople.length+','+Math.round(1.0/deltaTime)+','+Math.round(100*colorDots.length/(matrixW*matrixH))/100+','+Math.round(100*qsum/qcount)/100+'\n';
  }

  //Benchmark
  gNarrowPhases=0;
  gNarrowPhases2=0;
  gNarrowPhases_=0;
  gNarrowPhases2_=0;
}