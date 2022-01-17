function (mapType) {
    if (!mapType) {
        mapType = this.googleMap.getMapTypeId();
    }
    komoo.utils.createCookie("mapType", mapType, 90);
}