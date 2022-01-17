function codeAddressOnMap(address) {
    var encodedAdd = encodeURI(address);
    var mapsImage = '<img src="https://maps.googleapis.com/maps/api/staticmap?' + 
                    'zoom=14&size=640x180&format=jpeg&sensor=false&markers=color:red%7C' + 
                    encodedAdd + '"/>';
    $j('#map_section #map_div #google_map_canvas').empty().append(mapsImage);
    $j('#map_section #map_div #openMaps').off().enableTap().click( 
        function() {
            window.location = ((typeof PhoneGap != 'undefined' && PhoneGap) ? 
                              'maps:q=' : 'https://maps.google.com/maps?q=') + encodedAdd;
        });
}