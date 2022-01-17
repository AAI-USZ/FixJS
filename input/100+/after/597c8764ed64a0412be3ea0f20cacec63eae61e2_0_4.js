function() {

        $('#activatemap').show();

        $('#scroll').text('Karte vergrößern ↑');

        window.Trinkbrunnen.mapView.resizeMap();

        window.Trinkbrunnen.mapView.map.setCenter(mapCenter);

      }