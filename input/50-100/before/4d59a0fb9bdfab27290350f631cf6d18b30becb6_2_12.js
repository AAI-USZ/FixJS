function () {
    var that = this;
    var coords = [];
    this.getPaths().forEach(function (path, i) {
        var subCoords = [];
        path.forEach(function (latLng, j) {
            subCoords.push(that.getArrayFromLatLng(latLng));
        });
        // Copy the first point as the last one to close the loop
        if (subCoords.length) subCoords.push(subCoords[0]);
        coords.push(subCoords);
    });
    return coords;
}