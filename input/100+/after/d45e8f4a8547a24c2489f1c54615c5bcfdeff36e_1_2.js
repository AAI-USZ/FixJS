function(cfg) {
      if (cfg instanceof Array) {
        for (var i=0; i<cfg.length; i++) methods.add.call(this, cfg[i]);
        return;
      }
      var item = {config: cfg};

      // add marker to map
      if (cfg.marker) {
        var latlng = new L.LatLng(cfg.marker[0], cfg.marker[1]);
        item.marker = new L.Marker(latlng);
        if (cfg.popup) item.marker.bindPopup(cfg.popup);

        item.marker.index = DATA.items.length;
        item.marker.on('click', function(e) {
          methods.move(e.target.index, true);
        });
        DATA.markergroup.addLayer(item.marker);
      }

      // render to slide
      var slidesCt = $THIS.find('.smapp-slides-ct');
      var inner = '<div class="slide-inner">'+(cfg.html || '')+'</div>';
      item.slide = $('<div class="slide">'+inner+'</div>').appendTo(slidesCt);

      // calculate arrow compass for the marker
      if (DATA.options.exploreMode && data.options.keyEvents && item.marker) {
        item.compass = _getCompass(item.marker);
      }

      // figure out center and zoom (optional)
      item.zoom = item.marker ? cfg.zoom : DATA.options.zoom;
      item.center = item.marker ? item.marker.getLatLng() : DATA.options.center;
      if (cfg.center) {
        item.center = new L.LatLng(cfg.center[0], cfg.center[1]);
      }

      // store in items array, then refresh or show the current popup
      DATA.items.push(item);
      if (DATA.items.length == 1) {
        DATA.index = 0;
        DATA.items[0].slide.addClass('active');
        _autoHeight(DATA.items[0].slide, false);
        _showPopup(DATA.items[DATA.index]);
      }
      if (DATA.items.length == 2) {
        $THIS.find('.ctrl-right').addClass('active');
      }
      $THIS.find('.ctrl-count').html(DATA.index+1 + ' of ' + DATA.items.length);
    }