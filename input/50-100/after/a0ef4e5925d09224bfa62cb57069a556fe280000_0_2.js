function (numLoaded) {
      GEvent.removeListener(loadMarkersListener);
      var host = hosts[uid];


      if (!host) {
        host = {
          marker: new GMarker(map.getCenter(), redIcon),
          location: map.getCenter(),
          na: 1
        };
        clusterer.AddMarker(host.marker, Drupal.t('Unvailable member'));
      }
      var txt = makePopupHtml(host);

      host.marker.openInfoWindowHtml(txt, { maxWidth: 220 });
    }