function textCreate(ACaption,AX,AY) {
  // create new text
  var t = new Object();
  t.Type = 'Text';
  t.Selected = false;
  t.X = AX;
  t.Y = AY;
  t.Height = 13;
  t.Font = 'Sans';
  textChangeCaption(t,ACaption);
  t.move = textMove;
  t.distance = textDistance;
  t.draw = textDraw;
  return t;
}