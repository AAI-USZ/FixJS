function textChangeCaption(AItem,ACaption) {
  // po zmene caption treba zmenit width
  AItem.Caption = ACaption;
  kiji.context.font = AItem.Height+'px '+AItem.Font;
  AItem.Width = 1*kiji.context.measureText(AItem.Caption).width;
  if (ACaption == '')
    AItem.Width = 1*kiji.context.measureText('{EMPTY}').width;
}