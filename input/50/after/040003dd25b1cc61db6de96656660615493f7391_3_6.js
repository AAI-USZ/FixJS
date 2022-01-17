function (map) {
    if (map instanceof komoo.Map)
        return this.overlay_.setMap(map.googleMap);
    else
        return this.overlay_.setMap(map);
}