function() {

    var
      plotOffset = this.plotOffset,
      position = this.lastMousePos,
      context = this.octx;

    if (position) {
      context.clearRect(
        position.relX + plotOffset.left,
        plotOffset.top,
        1,
        this.plotHeight + 1
      );
      context.clearRect(
        plotOffset.left,
        position.relY + plotOffset.top,
        this.plotWidth + 1,
        1
      );    
    }
  }