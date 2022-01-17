function(event){
    var pos = this.getEventPosition(event);
    this.lastMousePos.pageX = pos.absX;
    this.lastMousePos.pageY = pos.absY;
    E.fire(this.el, 'flotr:mousemove', [event, pos, this]);
  }