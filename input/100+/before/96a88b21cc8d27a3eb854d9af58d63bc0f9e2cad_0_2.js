function(name){
    var a = this.axes,
        s = this.selection.selection,
        x1, x2, y1, y2;

    name = name || 'select';

    x1 = a.x.p2d(s.first.x);
    x2 = a.x.p2d(s.second.x);
    y1 = a.y.p2d(s.first.y);
    y2 = a.y.p2d(s.second.y);

    E.fire(this.el, 'flotr:'+name, [{
      x1:Math.min(x1, x2), 
      y1:Math.min(y1, y2), 
      x2:Math.max(x1, x2), 
      y2:Math.max(y1, y2),
      xfirst:x1, xsecond:x2, yfirst:y1, ysecond:y2,
      selection : s
    }, this]);
  }