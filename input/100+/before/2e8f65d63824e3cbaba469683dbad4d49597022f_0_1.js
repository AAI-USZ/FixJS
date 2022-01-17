function() {
  var win = Ti.UI.createWindow({
    title: 'Scrolling',
  	backgroundColor:'white',
  	layout: 'vertical',
  });
  
  var views = [];
  for (r = 0; r < 256; r += 64) {
    for (g = 0; g < 256; g += 64) {
      for (b = 0; b < 256; b += 64) {
        views.push(Ti.UI.createView({
          height: 100,
          width: 100,
          backgroundColor: utils.toHexString(r, g, b),
        }));
      }
    }
  }
  
  var carousel = TiCarousel.createCarouselView({
    carouselType: TiCarousel.CAROUSEL_TYPE_LINEAR,
    width: Ti.UI.FILL,
    height: 120,
    itemWidth: 108,
    numberOfVisibleItems: 7,
    views: views,
  });

  win.add(carousel);
  win.add(createDecelRateView(carousel));
  win.add(createScrollSpeedView(carousel));
  win.add(createScrollToBoundView(carousel));
  win.add(createStopAtBoundView(carousel));

  return win;
}