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
  //kiji.context.font = t.Height+'px '+t.Font;
  //t.Width = 1*kiji.context.measureText(ACaption).width;
  return t;
}