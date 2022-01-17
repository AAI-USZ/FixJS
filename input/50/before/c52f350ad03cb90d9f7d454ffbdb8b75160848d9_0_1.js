function updateOrientation(orientation){
    $(paper.canvas).parent().removeClass('landscape').removeClass('portrait').addClass(orientation);
  }