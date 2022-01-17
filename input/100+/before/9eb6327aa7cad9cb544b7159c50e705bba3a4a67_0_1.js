function(e){
    e.preventDefault();
    if(getpad.pen==1){  
      var touches = e.changedTouches;
      for (var i=0; i<touches.length; i++) {
        getpos.x=touches[i].pageX-(getpad.pad.offsetLeft-document.documentElement.scrollLeft);
        getpos.y=touches[i].pageY-(getpad.pad.offsetTop-document.documentElement.scrollTop);
        getpad.creatLine(getpos);
      }
      getpad.drawLine(getpos);
    }
  }