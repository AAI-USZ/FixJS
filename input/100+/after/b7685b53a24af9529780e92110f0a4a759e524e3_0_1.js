function preload(arrayOfImages) {
  var images = [];
  $.each(arrayOfImages, function(key, value) {
    if (value['symbol']) { 
      images[key] = new Image();
      images[key].src = dataDirectory + 'core/images/terrain/' + value['symbol'];
    }
  });
  images['hover-hex-top'] = new Image(); images['hover-hex-top'].src = dataDirectory + '../images/misc/hover-hex-top.png';
  images['hover-hex-bottom'] = new Image(); images['hover-hex-bottom'].src = dataDirectory + '../images/misc/hover-hex-bottom.png';
  images['hexgrid'] = new Image(); images['hexgrid'].src = 'ui/hexgrid.png';
}