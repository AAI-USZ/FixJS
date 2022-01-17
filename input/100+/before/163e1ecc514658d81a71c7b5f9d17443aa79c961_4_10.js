function(x,y,minZBuffer2,color,ray,caster,swapx,swapy) {
    var bakx=x, baky=y;
    x+=Math.floor(caster.x/matrixCellSize);
    y+=Math.floor(caster.y/matrixCellSize);
    if (x<0) x+=matrixW;
    if (y<0) y+=matrixH;
    if (x>=matrixW) x-=matrixW;
    if (y>=matrixH) y-=matrixH;
    var cell=getMatrixCell(x*matrixCellSize,y*matrixCellSize);
    for (dot=cell.first; dot!=null; dot=dot.next) {
      if (caster!=dot.data.element) { //FIXME
        gNarrowPhases++;
        var ret=rayCastNarrowPhase(caster,dot.data.element,ray);  //FIXME
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