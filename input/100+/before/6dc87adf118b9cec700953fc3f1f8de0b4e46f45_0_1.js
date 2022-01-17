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
        if (DATA.options.leafPile) {
          if (!L.Leafpile) $.error('Did you forget to include leafpile.js?');
          var opts = DATA.options.leafPile === true ? {} : DATA.options.leafPile;
          DATA.markergroup = new L.Leafpile(opts);

          // listen to zooms
          DATA.markergroup.on('leafpileclick', function(e) {
            var idx = e.markers[0].index;
            if (DATA.frozen) e.cancelZoom();
            if ($THIS.triggerHandler('move', [methods.get(idx), idx]) === false) return;
            DATA.map.closePopup();

            // slide the first marker in
            if (DATA.index !== null) _slideOut(DATA.items[DATA.index].$slide, (idx > DATA.index));
            _slideIn(DATA.items[idx].$slide, (idx > DATA.index));
            if (DATA.items[idx].config.popup) {
              var popup = e.markers[0]._popup.setLatLng(e.markers[0].getLatLng());
              DATA.map.openPopup(popup);
            }
            DATA.index = idx;
            _refreshControls();
          });
        }
        else {
          DATA.markergroup = new L.LayerGroup();
        }
        DATA.map.addLayer(DATA.markergroup);

        // setup initial items
        DATA.items = [];
        DATA.index = null;
        methods.add(DATA.options.slides);
      }
    }