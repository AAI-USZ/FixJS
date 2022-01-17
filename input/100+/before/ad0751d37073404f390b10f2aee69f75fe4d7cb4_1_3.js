function (context) {
  // Make sure this behavior is run only once.
  if (Drupal.settings.dingLibraryMap.initialised) { return; }

  // If OpenLayers is not done initialising yet, we wait for a while and
  // try again.
  if (!$('#library-map').data('openlayers')) {
    window.setTimeout(Drupal.behaviors.openlayersDingLibraryMap, 100);
    return;
  }
  Drupal.settings.dingLibraryMap.initialised = true;

  var lmc = new Drupal.DingLibraryMapController('library-map', Drupal.settings.dingLibraryMap);

  // On the page with the library list, there are links to view the
  // library on the map on each list item. We want to catch those clicks
  // and move the map to the area in question.
  $('#content-main .view-on-map-link').click(function () {
    var link = $(this),
        href = link.attr('href'),
        latMatch = /lat=(\d+\.?\d*)/.exec(href),
        lonMatch = /lon=(\d+\.?\d*)/.exec(href);

    // If we have coordinates for both dimensions, center the map and
    // scroll the browser to it.
    if (latMatch[1] && lonMatch[1]) {
      lmc.map.openlayers.setCenter(lmc.convertPosition(lonMatch[1], latMatch[1]));
      lmc.map.openlayers.zoomTo(15);
      lmc.expandMap();
      $.scrollTo(lmc.mapContainer, '500', { offset: -20 });
    }

    return false;
  });

  $('body').bind('DingLibraryStatusChange', function (event, nid, isOpen) {
    lmc.updateMarkerStatus(nid, isOpen);
  });
}