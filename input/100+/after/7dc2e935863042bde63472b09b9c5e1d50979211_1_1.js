function lineDrawPrimitive(ADx,ADy,AX1,AY1,AX2,AY2,ASelected,AColor,AThicknes,AGrip) {
  // line drawing from point A to B
  // threshold indicator
  if (kiji.show_threshold) {
    kiji.context.fillStyle = "red";
    kiji.context.strokeStyle = 'RGBA(0,155,155,0.2)';
    kiji.context.lineWidth = kiji.threshold;
    kiji.context.beginPath();
    kiji.context.moveTo(ADx+AX1,ADy+AY1);
    kiji.context.lineTo(ADx+AX2,ADy+AY2);
    kiji.context.lineCap = 'round';
    kiji.context.stroke();
    kiji.context.lineCap = 'miter';
  }
  // color by selection state
  kiji.context.fillStyle = "black";
  kiji.context.strokeStyle = 'black';
  if (ASelected) {
    kiji.context.fillStyle = "rgba(0,0,255,1.0)";
    kiji.context.strokeStyle = "rgba(0,0,255,1.0)";
    // grips
    // origin
    if (kiji.mouse_handler.start_handle == 1)
      kiji.context.fillStyle = "rgba(0,255,255,1.0)";
    else
      kiji.context.fillStyle = "rgba(0,255,0,1.0)";
    kiji.context.fillRect(ADx+AX1-2,ADy+AY1-2,4,4);
    // end
    if (kiji.mouse_handler.start_handle == 2)
      kiji.context.fillStyle = "rgba(0,255,255,1.0)";
    else
      kiji.context.fillStyle = "rgba(0,255,0,1.0)";
    kiji.context.fillRect(ADx+AX2-2,ADy+AY2-2,4,4);
  } else {
    kiji.context.fillStyle = "rgba(0,0,0,1.0)";
    kiji.context.strokeStyle = AColor;
  }
  // line
  //kiji.context.save();
  kiji.context.lineWidth = AThicknes;
  kiji.context.beginPath();
  kiji.context.moveTo(ADx+AX1,ADy+AY1);
  kiji.context.lineTo(ADx+AX2,ADy+AY2);
  kiji.context.stroke();
  //kiji.context.restore();
}