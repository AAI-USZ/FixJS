function (opt_mapType) {
    var mapType = opt_mapType || this.googleMap.getMapTypeId();
    komoo.utils.createCookie('mapType', mapType, 90);
}