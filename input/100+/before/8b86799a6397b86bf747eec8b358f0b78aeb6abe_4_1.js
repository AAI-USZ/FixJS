function textDraw(ACaption,AX,AY,AWidth,AHeight,AFont,AColor,ASelected,ADx,ADy) {
  // actual text drawing
  // color by selection state
  kiji.context.fillStyle = "rgba(0,0,0,1.0)";
  kiji.context.textAlign = "left";
  kiji.context.textBaseline = "alphabetic";
  // color by selection state
  if (ASelected) {
    kiji.context.fillStyle = "rgba(0,0,255,1.0)";
    kiji.context.strokeStyle = "rgba(0,0,255,1.0)";
  } else {
    kiji.context.fillStyle = "rgba(0,0,0,1.0)";
    kiji.context.strokeStyle = "rgba(0,0,0,1.0)";
  }
  // text
  kiji.context.save();
  kiji.context.translate(AX,AY);
  kiji.context.font = AHeight+'px '+AFont;
  if (ACaption == '')
    kiji.context.fillText('{EMPTY}',ADx,ADy);
  else
    kiji.context.fillText(ACaption,ADx,ADy);
  // rectangle around text
  /*
  kiji.context.lineWidth = 1;
  kiji.context.beginPath();
  kiji.context.rect(ADx,ADy-AHeight,AWidth,AHeight);
  kiji.context.stroke();
  kiji.context.lineWidth = 1.0;
  */
  kiji.context.restore();
}