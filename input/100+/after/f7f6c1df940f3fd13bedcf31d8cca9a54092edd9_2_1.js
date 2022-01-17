function(e) {

  var position = an.u.getMousePositionInCanvas(e);

  var handles = an.g.editor.getResizeArea();
  var p = this.position;

  var diffX = 0;
  if( (p == an.k.NW) || (p == an.k.SW) || (p == an.k.W) ) {
    diffX = position.x - handles.x[p];
  }
  if(handles.x[an.k.NE] == handles.x[an.k.NW]) {
    diffX = 0;
  }

  var diffY = 0;
  if( (p == an.k.NW) || (p == an.k.NE) || (p == an.k.N) ) {
    diffY = position.y - handles.y[p];
  }
  if(handles.y[an.k.SW] == handles.y[an.k.NW]) {
    diffY = 0;
  }

  var w;
  if( (p == an.k.NW) || (p == an.k.SW) || (p == an.k.W) ) {
    w = handles.x[an.k.NE] - position.x;
  } else if( (p == an.k.NE) || (p == an.k.E) || (p == an.k.SE) ) {
    w = position.x - handles.x[an.k.NW];
  } else {
    w = handles.x[an.k.NE] - handles.x[an.k.NW];
  }
  if(w <= 0) {
    w = 1;
  }

  var scaleX = w / (handles.x[an.k.NE] - handles.x[an.k.NW]);
  if(handles.x[an.k.NE] == handles.x[an.k.NW]) {
    scaleX = 0;
  }

  var h;
  if( (p == an.k.NW) || (p == an.k.N) || (p == an.k.NE) ) {
    h = handles.y[an.k.SW] - position.y;
  } else if( (p == an.k.SW) || (p == an.k.S) || (p == an.k.SE) ) {
    h = position.y - handles.y[an.k.NW];
  } else {
    h = handles.y[an.k.SW] - handles.y[an.k.NW];
  }
  if(h <= 0) {
    h = 1;
  }

  var scaleY = h / (handles.y[an.k.SW] - handles.y[an.k.NW]);;
  if(handles.y[an.k.SW] == handles.y[an.k.NW]) {
    scaleY = 0;
  }

  var fromX = handles.x[an.k.NW];
  var fromY = handles.y[an.k.NW];

  an.g.editor.resizeSelectedPaths(fromX, fromY, scaleX, scaleY);
  an.g.editor.translateSelectedPaths(diffX, diffY);

  an.g.editor.draw();

  // console.log(diffX, diffY);
}