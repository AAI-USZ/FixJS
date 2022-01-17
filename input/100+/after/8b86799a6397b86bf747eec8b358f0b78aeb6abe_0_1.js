function itemBind(AReport) {
  // after report is loaded (from json) add methods depending on type
  for(var i=0; i<AReport.length; i++) {
    switch(AReport[i].Type) {
      case 'Text':
        AReport[i].distance = textDistance;
        AReport[i].draw = textDraw;
        AReport[i].move = textMove;
        break;
      case 'Line':
        AReport[i].distance = lineDistance;
        AReport[i].draw = lineDraw;
        AReport[i].move = lineMove;
        break;
    }
  }
}