function(params) {
  var map = this;

  params = params || {};

  this.params = params;
  this.mapData = jvm.WorldMap.maps[params.map];

  this.container = params.container;

  this.defaultWidth = this.mapData.width;
  this.defaultHeight = this.mapData.height;

  this.setBackgroundColor(params.backgroundColor);

  $(window).resize(function(){
    map.setSize();
  });

  this.canvas = new jvm.VectorCanvas(params.container[0], this.width, this.height);

  if ( ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) ) {
    this.bindContainerTouchEvents();
  } else {
    this.bindContainerEvents();
  }
  this.bindElementEvents();
  this.createLabel();
  this.bindZoomButtons();
  this.createRegions();
  this.createMarkers(params.markers || {});

  this.setSize();

  if (this.params.series) {
    this.createSeries();
  }
}