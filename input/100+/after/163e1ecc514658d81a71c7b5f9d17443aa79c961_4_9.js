function rayCastBroadPhase_new(caster, ray, x, y) {
  var miny;
  var maxy;

  var color=-1;
  var minZBuffer2=999999;

  if (ray.angle>360) ray.angle-=360;
  else if (ray.angle<0) ray.angle+=360;

  //Already tested : works fine
  if (ray.angle>315 || ray.angle<45) {
    swapx=-1; swapy=-1;
  }
  else if (ray.angle>=45 && ray.angle<135) {
    swapx=1; swapy=1;
  }
  else if (ray.angle>=135 && ray.angle<225) {
    swapx=1; swapy=-1;
  }
  else if (ray.angle>=225 && ray.angle<315) {
    swapx=-1; swapy=1;
  }
  else console.log(ray.angle);

  var alreadyChecked=Array();
  for (var i=-10; i<10; i++) {
    alreadyChecked[i]=Array();
    for (var j=-10; j<10; j++)
      alreadyChecked[i][j]=false;
  }
  
  var zBuffer2=999999;
  var drawLine=false;
  //TODO maxdist
  //TODO we could make this quicker by not exploring nearby cells that were already explored
  //TODO pass shift to narrow phase
  for (var nx=-1; nx<=5; nx++) {
    //We can't write directly to x because x and y may be swapped several times in the sub-loop
    var ox=nx*swapx;
    var max=(x<2)?2*nx+5:9;
    for (var j=0; j<=max; j++) {
      var ny=(j%2==0)?j/2:-(j+1)/2;
      if (swapy==-1) {
        var y=ox;
        var x=swapx*ny;
      }
      else {
        var y=ny;
        var x=ox;
      }
      //console.log('exploring cell at '+caster.x+' '+caster.y+' '+x+' '+y);
      //To store a potention shift
      var modVec=new Vector();
      var cell=getMatrixCellShifted(caster.x,caster.y,x,y,modVec);
      alreadyChecked[x][y]=true;
      if (cell.length!=0) {
        for (var dot=cell.first; dot!=null; dot=dot.next) {
          if (caster!=dot.data.element) {
            drawLine=true;
            //console.log('narrow');
            var ret=rayCastNarrowPhase(caster,dot.data.element,ray,modVec.x,modVec.y);  //TESTME tell how to shift
            qcount++;
            gNarrowPhases++;
            if (ret.isOnRay==true && ret.distance2<Math.pow(5*matrixCellSize,2)) {  //TODO (5*matricCellSize)^2 is constant, hard-code it
              gNarrowPhases_++;
              qsum++;
              zBuffer2=ret.distance2;
              color=dot.data.element.color;
              //Explore nearby cells too
              for (var x2=-1; x2<=1; x2++) {
                for (var y2=-1; y2<=1; y2++) {
                  if (!(x2==0 && y2==0)) {
                    var x3=x+x2;
                    var y3=y+y2;
                    if (alreadyChecked[x3][y3]==false) {
                      //TODO with swap : if (x3<=5 && x3>=-1 && y3>=-4 && y3<=4) {
                        //To store a potention shift
                        var modVec=new Vector();
                        var cell2=getMatrixCellShifted(caster.x,caster.y,x3,y3,modVec);
                        if (cell.length!=0) {
                          for (var dot2=cell.first; dot2!=null; dot2=dot2.next) {
                            gNarrowPhases2++;
                            var ret2=rayCastNarrowPhase(caster,dot2.data.element,ray,modVec.x,modVec.y);
                            if (ret2.isOnRay==true) {
                              gNarrowPhases2_++;
                              var zBufferTemp2=ret2.distance2;
                              if (zBufferTemp2<zBuffer2) {
                                zBuffer2=zBufferTemp2;
                                color=dot2.data.element.color;
                              }
                            }
                          }
                        }
                    //}
                    }
                  }
                }
              }
              return (color);
            }
          }
        }
      }
    }
  }
  return (color);
}