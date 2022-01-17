function initialize_map() {
    // Initialize map.
    map = new L.Map('map', { minZoom: 1 });
    attribution = ('Map data &copy; <a href="http://openstreetmap.org">' +
                   'OpenStreetMap</a> contributors, <a href="http://creativecommons.org/' +
                   'licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
                   '<a href="http://cloudmade.com">CloudMade</a>')
    cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/' +
                                'b465ca1b6fe040dba7eec0291ecb7a8c/' +
                                '997/256/{z}/{x}/{y}.png',
                                { attribution: attribution, maxZoom: 18 });
    center = new L.LatLng(25, 0); // geographical point (longitude and latitude)
    map.setView(center, 2).addLayer(cloudmade);

    // When user clicks on map and a search filter exists, remove filter.
    map.on('click', function(e) {
        var val = $('#searchfield').val();
        if (val != '') {
            search_string = '';
            $('#searchfield').val(search_string);
            $('#searchfield').trigger('input');
        }
    });
}