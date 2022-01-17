function (mapDiv, initLoc) {
    console.log("initializing map in " + mapDiv);

    var center;
    var zoom;
    if (!initLoc) {
      center = new google.maps.LatLng(43.6621614579938, -79.39527873417967);
      zoom = 3;
    } else {
      center = veos.map.convertGeolocToGmapLatLng(initLoc);
      zoom = 13;
    }

    var mapOptions = {
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: center,
      streetViewControl: false,
      zoomControl: false // use pinch-zoom instead, controls are too small to use on phone
    };

    jQuery(mapDiv).empty(); // empty out the div in case it was previously used to init another map...

    var mapElement = jQuery(mapDiv)[0];

    var gmap = new google.maps.Map(mapElement, mapOptions);

    jQuery(document).bind("pageshow", function (ev) {
        console.log("Triggering gmaps resize for page ", ev.target);
        google.maps.event.trigger(gmap, 'resize');
    });

    this.gmap = gmap;
  }