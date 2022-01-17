function redraw(AIdentifier) {
  // redraw entire canvas
  console.log('redraw('+AIdentifier+'): c.w='+kiji.canvas.width+' c.h='+kiji.canvas.height+' bg.w='+kiji.bg.width+' bg.h='+kiji.bg.height+' dx='+kiji.dx+' dy='+kiji.dy)
  // clear canvas
  kiji.context.clearRect(0,0,kiji.canvas.width,kiji.canvas.height);
  // background
  //kiji.context.fillRect(0,0,kiji.canvas.width,kiji.canvas.height);
  kiji.context.drawImage(kiji.bg, kiji.dx, kiji.dy);
  // 90% white overlay
  if (kiji.white) {
    kiji.context.fillStyle = 'rgba(255,255,255,0.90)';
    kiji.context.fillRect(kiji.dx, kiji.dy, kiji.bg.width, kiji.bg.height);
  }
  // report items
  for (var i=0; i<kiji.report.length; i++)
    kiji.report[i].draw(kiji.dx,kiji.dy);
}