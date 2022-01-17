function () {
    var that = this;
    var coords = [];
    this.getPoints().forEach(function (point, index, orig) {
        coords.push(that.getArrayFromLatLng(point.getPosition()));
    });
    return coords;
}