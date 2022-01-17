function _getMarkerLayer() {
    var markerLayer;

    // create a leafpile, or a normal layer
    if (DATA.options.leafPile) {
      if (!L.Leafpile) $.error('Did you forget to include leafpile.js?');
      var opts = DATA.options.leafPile === true ? {} : DATA.options.leafPile;
      markerLayer = new L.Leafpile(opts);

      // listen to zooms
      markerLayer.on('leafpileclick', function(e) {
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
      markerLayer = new L.LayerGroup();
    }
    return markerLayer;
  }