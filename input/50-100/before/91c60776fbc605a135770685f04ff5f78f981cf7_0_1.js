function navigateFilter(lat, lon, markerId) {
    easey().map(filter_map)
        .to(filter_map.locationCoordinate({lat: lat, lon: lon})
        .zoomTo(8))
        .run(2000);

    $('.cidade-marker').removeClass('active');
    if(markerId)
        $('.cidade-marker[data-cidade="'+markerId+'"]').addClass('active');
}