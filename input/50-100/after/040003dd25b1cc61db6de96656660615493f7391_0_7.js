function (opt_center, opt_zoom) {
    var center = opt_center || this.googleMap.getCenter();
    var zoom = opt_zoom || this.googleMap.getZoom();
    komoo.utils.createCookie('lastLocation', center.toUrlValue(), 90);
    komoo.utils.createCookie('lastZoom', zoom, 90);
}