function updateOrientation(orientation){
    // $(paper.canvas).parent().removeClass('landscape').removeClass('portrait').addClass(orientation);
    $('#ui-locator-view, .the-columns').removeClass('landscape').removeClass('portrait').addClass(orientation);
  }