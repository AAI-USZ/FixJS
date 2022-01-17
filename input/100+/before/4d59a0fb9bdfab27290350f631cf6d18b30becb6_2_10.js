function (coordinates) {
    var that = this;
    var paths = [];
    this.bounds_ = undefined;
    coordinates.forEach(function (coord, index, orig) {
        var path = [];
        coord.forEach(function (pos, index_, orig_) {
            path.push(that.getLatLngFromArray(pos));
        });
        // Removes the last point that closes th
        // This point is not used by google maps
        path.pop()
        paths.push(path);
    });
    this.setPaths(paths);
}