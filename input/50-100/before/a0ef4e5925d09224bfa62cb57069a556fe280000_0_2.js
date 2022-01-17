function (numLoaded) {
      GEvent.removeListener(loadMarkersListener);
      var host = hosts[uid];

      if (!host) {
        map.openInfoWindowHtml(
          map.getCenter(),
          Drupal.t("User's general location<br/>(Not currently available to host)"), {maxWidth:220});
        return;
      }

      txt = makePopupHtml(host);
      host.marker.openInfoWindowHtml(txt, {maxWidth:220});
    }