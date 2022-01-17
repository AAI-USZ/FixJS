function(params) {
  var map = this;

  this.params = $.extend(true, jvm.WorldMap.defaultParams, params);
  this.mapData = jvm.WorldMap.maps[this.params.map];
  this.markers = {};

  this.container = this.params.container;
  this.container.css({
    position: 'relative',
    overflow: 'hidden'
  });

  this.defaultWidth = this.mapData.width;
  this.defaultHeight = this.mapData.height;

  this.setBackgroundColor(this.params.backgroundColor);

  $(window).resize(function(){
    map.setSize();
  });

  for (event in jvm.WorldMap.apiEvents) {
    if (this.params[event]) {
      this.container.bind(jvm.WorldMap.apiEvents[event]+'.jvectormap', this.params[event]);
    }
  }

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