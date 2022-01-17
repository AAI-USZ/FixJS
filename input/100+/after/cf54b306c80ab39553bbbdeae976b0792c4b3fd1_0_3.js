function add_pointers() {
    // Add user pointers on map.
    $('.profiles-li-item').each(function(index, item) {
        var lat = $(item).data('lat');
        var lon = $(item).data('lon');
        var markerLocation = new L.LatLng(lat, lon);
        var marker = new L.Marker(markerLocation);

        // Clicking on a pointer makes others disappear if visible, or
        // otherwise appear.
        marker.on('click', function(e) {
            var val = $('#searchfield').val();
            var fullname = $(item).data('fullname');
            if (val != '') {
                search_string = '';
            }
            else {
                search_string = fullname;
            }
            $('#searchfield').val(search_string);
            $('#searchfield').trigger('input');
        });

        map.addLayer(marker);
        markers_array.push(marker);
    })
}