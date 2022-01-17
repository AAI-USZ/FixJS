function navigateFilter(lat, lon, zoom, markerId) {
    easey().map(filter_map)
        .to(filter_map.locationCoordinate({lat: lat, lon: lon})
        .zoomTo(zoom))
        .run(2000);

    $('.cidade-marker').removeClass('active');
    if(markerId)
        $('.cidade-marker[data-cidade="'+markerId+'"]').addClass('active');
}