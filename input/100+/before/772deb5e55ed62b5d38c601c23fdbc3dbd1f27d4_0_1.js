function createTiler(options) {
  var fetches = 0;
  var hNumber = 0;
  var element = $('<div/>').appendTo(document.body);

  element.css('width', 100);
  element.css('height', 100);

  var tiler = new Tiler(element, $.extend({}, {
    x: 0, y: 0,
    tileSize: 100,
    margin: 1,
    fetch: function() {
      if (fetches++ == 0) {
        tiler.show(dummyTiles());
      }
    }
  }, options));

  return tiler;
}