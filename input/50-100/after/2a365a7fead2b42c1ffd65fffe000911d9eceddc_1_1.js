function () {
    var width = $('.map').width(),
        windowHeight = $(window).height(),
        mapCanvasHeight = (width * (369.0 / 567.0) - 100);    
    self.map.setSize(width, mapCanvasHeight);
	console.log(width);
  }