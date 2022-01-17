function wsmap_main_load_entry() {

  try {
    // Grab necessary settings into globals.
    mapdata_source = Drupal.settings.wsmap.mapdata_source;
    loggedin = Drupal.settings.wsmap.loggedin;
    mapwidth = Drupal.settings.wsmap.mapwidth; // Integer percent
    base_path = Drupal.settings.wsmap.base_path;

    $(window).resize(map_resize);
    map_resize();

    setMapStartPosition();

    redIcon = new GIcon();
    redIcon.image = base_path + '/clusterer/red.PNG';
    redIcon.shadow == base_path + '/clusterer/shadow.PNG';
    redIcon.iconSize = new GSize(20, 34);
    redIcon.shadowSize = new GSize(37, 34);
    redIcon.iconAnchor = new GPoint(9, 34);
    redIcon.infoWindowAnchor = new GPoint(9, 2);
    redIcon.infoShadowAnchor = new GPoint(18, 25);

    map = new GMap2($('#wsmap_map')[0]);
    map.setCenter(new GLatLng(defaultLocation.latitude, defaultLocation.longitude), defaultLocation.zoom);
    map.setMapType(G_PHYSICAL_MAP);

    om = new OverlayMessage($('#wsmap_map')[0]);

    map.addControl(new GLargeMapControl());
    map.addControl(new GOverviewMapControl());


    map.addControl(new GMapTypeControl());
    map.addControl(new GScaleControl());
    map.addMapType(G_PHYSICAL_MAP);
    clusterer = new Clusterer(map);

    clusterer.maxVisibleMarkers = maxvisiblemarkers;
    clusterer.icon.image = base_path + '/clusterer/blue_large.PNG';
    clusterer.icon.shadow = base_path + '/clusterer/shadow_large.PNG';
    maxlines = mapwidth > 400 ? 10 : 5;
    clusterer.SetMaxLinesPerInfoBox(6);

    // If we have a map-submit (go) button with some information configured,
    // Go to that location, but do not submit.
    $('#edit-map-submit').click(function (event) {
      event.preventDefault();
      var country = $('#edit-country').val();
      var city = $('#edit-city').val();
      var location = city.split('|');
      if (!city) {
        setMapLocationToCountry(country);
      }
      else {
        zoomToSpecific(location[0], location[1], location[2], 8);
      }
    });


    if ($('#showuser').length) {
      var user = $('#showuser');
      zoomToUser(user.attr('uid'), user.attr('latitude'), user.attr('longitude'), 7);
    }


    // loadMarkers();
    GEvent.addListener(map, 'dragstart', dragstart_called);
    GEvent.addListener(map, 'dragend', dragend_called);
    GEvent.addListener(map, 'zoomend', dragend_called);

    // Handle setting of position cookie whenever map moves
    GEvent.addListener(map, "moveend", function () {
      var mapStatus = {
        latitude:map.getCenter().lat(),
        longitude:map.getCenter().lng(),
        zoom:map.getZoom()
      };

      $.cookie('mapStatus', JSON.stringify(mapStatus), {expires:cookieExpiration});

    });
    loadMarkers();
  }
  catch (e) {
    var msg = Props(e);
    console.log('Main loop:\n' + msg);

  }

}