function initializeMap() {
    if (map) return true;
    
    if (!window.google || !window.google.maps) return false;
    
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControl: false
    }
    map = new google.maps.Map(document.getElementById("google_map_canvas"), myOptions);
    $j('#map_section #map_div #recenter').unbind().click( 
        function() {
            if (map && marker) { map.setCenter(marker.getPosition()); }
        });
    return true;
}