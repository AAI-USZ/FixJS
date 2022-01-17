function () {
    var mapType = komoo.utils.readCookie("mapType");
    if (mapType) {
        this.googleMap.setMapTypeId(mapType);
        return true;
    }
    return false;
}