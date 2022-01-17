function (e){

    var
      d = document,
      b = d.body,
      de = d.documentElement,
      axes = this.axes,
      plotOffset = this.plotOffset,
      lastMousePos = this.lastMousePos,
      pointer = E.eventPointer(e),
      dx = pointer.x - lastMousePos.pageX,
      dy = pointer.y - lastMousePos.pageY,
      r, rx, ry;

    if ('ontouchstart' in this.el) {
      r = D.position(this.overlay);
      rx = pointer.x - r.left - plotOffset.left;
      ry = pointer.y - r.top - plotOffset.top;
    } else {
      r = this.overlay.getBoundingClientRect();
      rx = e.clientX - r.left - plotOffset.left - b.scrollLeft - de.scrollLeft;
      ry = e.clientY - r.top - plotOffset.top - b.scrollTop - de.scrollTop;
    }

    return {
      x:  axes.x.p2d(rx),
      x2: axes.x2.p2d(rx),
      y:  axes.y.p2d(ry),
      y2: axes.y2.p2d(ry),
      relX: rx,
      relY: ry,
      dX: dx,
      dY: dy,
      absX: pointer.x,
      absY: pointer.y,
      pageX: pointer.x,
      pageY: pointer.y
    };
  }