function(options) {
    var defaultParams = {
          map: 'world_mill_en',
          backgroundColor: '#505050',
          scaleColors: ['#b6d6ff', '#005ace'],
          normalizeFunction: 'linear',
          zoomOnScroll: true,
          zoomMax: 8,
          zoomMin: 1,
          zoomStep: 1.6,
          regionsSelectable: false,
          markersSelectable: false,
          regionStyle: {
            initial: {
              fill: 'white',
              "fill-opacity": 1,
              stroke: 'none',
              "stroke-width": 0,
              "stroke-opacity": 1
            },
            hover: {
              "fill-opacity": 0.8
            },
            selected: {
              fill: 'yellow'
            },
            selectedHover: {
            }
          },
          markerStyle: {
            initial: {
              fill: 'white',
              stroke: '#505050',
              "fill-opacity": 1,
              "stroke-width": 1,
              "stroke-opacity": 1,
              r: 5
            },
            hover: {
              stroke: 'black',
              "stroke-width": 2
            },
            selected: {
              fill: 'blue'
            },
            selectedHover: {
            }
          }
        },
        map,
        methodName,
        event;

    if (options === 'addMap') {
      jvm.WorldMap.maps[arguments[1]] = arguments[2];
    } else if ((options === 'set' || options === 'get') && apiParams[options][arguments[1]]) {
      methodName = arguments[1].charAt(0).toUpperCase()+arguments[1].substr(1);
      return this.data('mapObject')[options+methodName].apply(this.data('mapObject'), Array.prototype.slice.call(arguments, 2));
    } else {
      $.extend(true, defaultParams, options);
      defaultParams.container = this;
      this.css({
        position: 'relative',
        overflow: 'hidden'
      });
      map = new jvm.WorldMap(defaultParams);
      this.data('mapObject', map);
      for (event in apiEvents) {
        if (defaultParams[event]) {
          this.bind(apiEvents[event]+'.jvectormap', defaultParams[event]);
        }
      }
    }
  }