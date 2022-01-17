function(x,y,minZBuffer2,color,ray,caster,swapx,swapy) {
    var bakx=x, baky=y;
    x+=Math.floor(caster.x/matrixCellSize);
    y+=Math.floor(caster.y/matrixCellSize);
    var modVec=new Vector();
    if (x<0) {x+=matrixW; modVec.x-=1;}
    if (y<0) {y+=matrixH; modVec.y-=1;}
    if (x>=matrixW) {x-=matrixW; modVec.x+=1;}
    if (y>=matrixH) {y-=matrixH; modVec.y+=1;}
    //TODO see why matrixW is not correct
    //To store a potential shift
    var cell=getMatrixCell(x*matrixCellSize,y*matrixCellSize);
    for (dot=cell.first; dot!=null; dot=dot.next) {
      if (caster!=dot.data.element) { //FIXME
        gNarrowPhases++;
        var ret=rayCastNarrowPhase(caster,dot.data.element,ray,modVec.x,modVec.y);  //FIXME
        qcount++;
        if (ret.isOnRay==true) {
          gNarrowPhases_++;
          qsum++;
          if (ret.distance2<minZBuffer2) {
            minZBuffer2=ret.distance2;
            color=dot.data.element.color;
          }
        }
      }
    }
    return (new function() {this.minZBuffer2=minZBuffer2; this.color=color;});
  }