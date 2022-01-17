function() {
      DATA.map.removeLayer(DATA.markergroup);
      $THIS.find('.smapp-slides-ct').empty();

      // re-init the blank map
      DATA.markergroup = _getMarkerLayer();
      DATA.map.addLayer(DATA.markergroup);
      DATA.items = [];
      DATA.index = null;
      _refreshControls();

      // re-center the blank map
      DATA.map.setView(DATA.options.center, DATA.options.zoom);
    }