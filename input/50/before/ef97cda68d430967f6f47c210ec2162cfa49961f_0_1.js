function(e){
    getpad.pen=1;
    getpos=posfn(e.changedTouches, getpad.pad);
    getpad.creatLine(getpos);
  }