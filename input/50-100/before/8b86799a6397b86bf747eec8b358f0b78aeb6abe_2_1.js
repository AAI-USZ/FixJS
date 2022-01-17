function lineCreate(AX,AY,AEndX,AEndY) {
  // create new line
  var t = new Object();
  t.Type = 'Line';
  t.Thicknes = 1;
  t.Selected = false;
  t.Color = 'black';
  t.X = AX;
  t.Y = AY;
  t.EndX = AEndX;
  t.EndY = AEndY;
  return t;
}