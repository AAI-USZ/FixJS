function itemMoveSelected(AReport,ADeltaX,ADeltaY) {
  // move selected items by given delta
  for(var i=0; i<AReport.length; i++)
    if (AReport[i].Selected) {
      // Text
      if (AReport[i].Type == 'Text') {
        AReport[i].X += ADeltaX;
        AReport[i].Y += ADeltaY;
      }
      // line
      if (AReport[i].Type == 'Line') {
        AReport[i].X += ADeltaX;
        AReport[i].Y += ADeltaY;
        AReport[i].EndX += ADeltaX;
        AReport[i].EndY += ADeltaY;
      }
    }
}