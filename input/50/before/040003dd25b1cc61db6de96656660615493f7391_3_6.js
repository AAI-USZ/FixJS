function (map) {
    if (map instanceof komoo.Map)
        return this.object_.setMap(map.googleMap);
    else
        return this.object_.setMap(map);
}