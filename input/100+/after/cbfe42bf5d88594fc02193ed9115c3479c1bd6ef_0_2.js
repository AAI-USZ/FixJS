function( $ ){
  var apiParams = {
        set: {
          colors: 1,
          values: 1,
          backgroundColor: 1,
          scaleColors: 1,
          normalizeFunction: 1,
          focus: 1
        },
        get: {
          selectedRegions: 1,
          selectedMarkers: 1,
          mapObject: 1
        }
      };

  $.fn.vectorMap = function(options) {
    var map,
        methodName,
        event;

    if (options === 'addMap') {
      jvm.WorldMap.maps[arguments[1]] = arguments[2];
    } else if ((options === 'set' || options === 'get') && apiParams[options][arguments[1]]) {
      methodName = arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1);
      return this.data('mapObject')[options+methodName].apply(this.data('mapObject'), Array.prototype.slice.call(arguments, 2));
    } else {
      options.container = this;
      map = new jvm.WorldMap(options);
      this.data('mapObject', map);
    }
  };
}