function(index, item) {
        lat = $(item).data('lat');
        lon = $(item).data('lon');
        var markerLocation = new L.LatLng(lat, lon);
        var marker = new L.Marker(markerLocation);

        // Clicking on a pointer makes others disappear if visible, or
        // otherwise appear.
        marker.on('click', function(e) {
            var val = $('input#searchfield').val();
            var fullname = $(item).data('fullname');
            if (val != '') {
                search_string = '';
            }
            else {
                search_string = fullname;
            }
            $('input#searchfield').val(search_string);
            qs.search(search_string)
            qs.cache();
            redraw_grid();
        })

        map.addLayer(marker);
        markers_array[item.id] = marker;
    }