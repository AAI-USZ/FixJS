function itemMoveSelected(AReport,ADeltaX,ADeltaY) {
  // move selected items by given delta
  for(var i=0; i<AReport.length; i++)
    if (AReport[i].Selected)
      AReport[i].move(ADeltaX,ADeltaY);
}