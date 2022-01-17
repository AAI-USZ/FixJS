function(params) {
  var map = this;

  this.params = $.extend(true, jvm.WorldMap.defaultParams, params);
  this.mapData = jvm.WorldMap.maps[this.params.map];
  this.markers = {};

  this.container = this.params.container;

  this.defaultWidth = this.mapData.width;
  this.defaultHeight = this.mapData.height;

  this.setBackgroundColor(this.params.backgroundColor);

  $(window).resize(function(){
    map.setSize();
  });

  this.canvas = new jvm.VectorCanvas(this.params.container[0], this.width, this.height);

  if ( ('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch) ) {
    this.bindContainerTouchEvents();
  } else {
    this.bindContainerEvents();
  }
  this.bindElementEvents();
  this.createLabel();
  this.bindZoomButtons();
  this.createRegions();
  this.createMarkers(this.params.markers || {});

  this.setSize();

  if (this.params.series) {
    this.createSeries();
  }
}