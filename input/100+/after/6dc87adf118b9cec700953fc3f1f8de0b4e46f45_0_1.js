function(passedOpts) {
      if (passedOpts === undefined) {
        return DATA.options;
      }
      else {
        DATA.options = $.extend({}, DATA.options, passedOpts);
        $THIS.empty();
        $THIS.append(_makeHTML(DATA.options));
        showEl = $('.smapp-show', $THIS)[0];
        mapEl  = $('.smapp-map',  $THIS)[0];

        // left/right listeners
        $(showEl)
          .on('click', '.ctrl-left', function() {$THIS.slideMapper('prev');})
          .on('click', '.ctrl-right', function() {$THIS.slideMapper('next');});
        methods.keyEvents(DATA.options.keyEvents);

        // initialize the map
        DATA.options.center = new L.LatLng(DATA.options.center[0], DATA.options.center[1]);
        DATA.map = new L.Map(mapEl, DATA.options);
        _setTiles(DATA.options.mapType);

        // create a layer for the markers
        DATA.markergroup = _getMarkerLayer();
        DATA.map.addLayer(DATA.markergroup);

        // setup initial items
        DATA.items = [];
        DATA.index = null;
        methods.add(DATA.options.slides);
      }
    }