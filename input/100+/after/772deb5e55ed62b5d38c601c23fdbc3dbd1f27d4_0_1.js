function createTiler(options) {
  var element = $('<div/>').appendTo(document.body);
  element.css('height', (options && options.height) || 100);
  element.css('width', (options && options.width) || 100);

  var tiler = new Tiler(element, $.extend({}, {
    x: 0, y: 0, tileSize: 100, margin: 1
  }, options));

  return tiler;
}