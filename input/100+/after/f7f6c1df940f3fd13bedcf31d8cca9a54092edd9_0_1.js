function() {

  var rect = this.editor.getBoundaryOfSelectedPaths();
  var ret = {};

  // handle
  var x = new Array();
  var y = new Array();
  x[an.k.NW] = rect.x;
  y[an.k.NW] = rect.y;
  x[an.k.SW] = rect.x;
  y[an.k.SW] = rect.y + rect.h;
  x[an.k.SE] = rect.x + rect.w;
  y[an.k.SE] = rect.y + rect.h;
  x[an.k.NE] = rect.x + rect.w;
  y[an.k.NE] = rect.y;
  x[an.k.W] = rect.x;
  y[an.k.W] = rect.y + rect.h / 2;
  x[an.k.S] = rect.x + rect.w / 2;
  y[an.k.S] = rect.y + rect.h;
  x[an.k.E] = rect.x + rect.w;
  y[an.k.E] = rect.y + rect.h / 2;
  x[an.k.N] = rect.x + rect.w / 2;
  y[an.k.N] = rect.y;

  ret.x = x;
  ret.y = y;

  return ret;
}