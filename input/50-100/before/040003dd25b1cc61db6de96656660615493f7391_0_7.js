function (center) {
    if (!center) {
        center = this.googleMap.getCenter();
    }
    var zoom = this.googleMap.getZoom();
    komoo.utils.createCookie("lastLocation", center.toUrlValue(), 90);
    komoo.utils.createCookie("lastZoom", zoom, 90);
}