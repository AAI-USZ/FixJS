function updateZoom(AThis,AEvent,AKoefMul,AKoefAdd) {
  // arbitrary zoom
  //console.log('zoom('+AKoefMul+'*'+zoom+'+'+AKoefAdd+'): zoom='+zoom+' cw='+kiji.canvas.width+' ch='+kiji.canvas.height+' dx='+kiji.dx+' dy='+kiji.dy);
  // qx,qy = real coords on paper (background), e.g. 200,400 control point
  var cx = AEvent.pageX-AThis.offsetLeft;
  var cy = AEvent.pageY-AThis.offsetTop;
  var qx = cx*(kiji.canvas.width/kiji.canvas.clientWidth)-kiji.dx;
  var qy = cy*(kiji.canvas.height/kiji.canvas.clientHeight)-kiji.dy;
  //console.log('    cx='+cx+' cy='+cy+' qx='+qx+' qy='+qy);

  // actual zoom
  kiji.zoom = AKoefMul*kiji.zoom + AKoefAdd;
  if (kiji.zoom < 0.5) {
    kiji.zoom = 0.5;
    return false;
  }
  if (kiji.zoom > 20) {
    kiji.zoom = 20;
    return false;
  }
  kiji.canvas.width = kiji.bg.width / kiji.zoom;
  kiji.canvas.height = kiji.bg.height / kiji.zoom;

  // now return pan back to origin, so that zoomed point remain under mouse cursor
  kiji.dx = -qx + cx*(kiji.canvas.width/kiji.canvas.clientWidth);
  kiji.dy = -qy + cy*(kiji.canvas.height/kiji.canvas.clientHeight);
  //console.log('    dx='+kiji.dx+' dy='+kiji.dy);

  redraw('updateZoom');
}