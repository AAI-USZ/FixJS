function () {
    var width = $('.yui3-u-3-5').width(),
        windowHeight = $(window).height(),
        mapCanvasHeight = width * (369.0 / 567.0);    
    self.map.setSize(width, mapCanvasHeight);
	console.log(window.location.hostname);
  }