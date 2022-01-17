function(e){
    e.preventDefault();
    if(getpad.pen==1){  
      getpos=posfn(e.changedTouches, getpad.pad);
      getpad.drawLine(getpos);
    }
  }