function() {
    if (this.lastMousePos.relX)
      this.octx.clearRect(this.lastMousePos.relX-0.5, this.plotOffset.top, 1,this.plotHeight+1);
    if (this.lastMousePos.relY)
      this.octx.clearRect(this.plotOffset.left, this.lastMousePos.relY-0.5, this.plotWidth+1, 1);    
  }