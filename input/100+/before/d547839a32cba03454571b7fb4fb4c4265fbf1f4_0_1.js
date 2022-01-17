function () {
    var that = this;
    var bounds;
    var n, w, s, e;
    var getBounds = function (pos) {
        if (n === undefined) {
            n = s = pos[0];
            w = e = pos[1];
        }
        n = Math.max(pos[0], n);
        s = Math.min(pos[0], s);
        w = Math.min(pos[1], w);
        e = Math.max(pos[1], e);
        return [[s, w], [n, e]];
    };
    var coordinates = this.getCoordinates();
    if (this.getGeometryType() != komoo.GeometryType.POLYGON &&
        this.getGeometryType() != komoo.GeometryType.MULTIPOLYLINE)
        coordinates = [coordinates];
    coordinates.forEach(function (path, index, orig) {
        path.forEach(function (pos, index_, orig_) {
            bounds = getBounds(pos);
        });
    });
    this.bounds_ = new google.maps.LatLngBounds(
            this.getLatLngFromArray(bounds[0]),
            this.getLatLngFromArray(bounds[1])
        );
    this.bounds = this.bounds_; // TODO: This should be removed
    return this.bounds_;
}