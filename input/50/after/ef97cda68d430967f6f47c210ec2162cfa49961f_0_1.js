function(e){
    e.preventDefault();
    getpad.pen=1;
    getpos=posfn(e.changedTouches, getpad.pad);
    getpad.creatLine(getpos);
  }