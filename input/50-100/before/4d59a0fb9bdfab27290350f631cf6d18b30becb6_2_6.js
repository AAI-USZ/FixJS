function (coordinates) {
    var that = this;
    var coords = coordinates;
    if (!coords[0].pop) coords = [coords];
    this._guaranteePoints(coords.length);
    this.bounds_ = undefined;
    this.getPoints().forEach(function (point, index, orig) {
        point.setPosition(that.getLatLngFromArray(coords[index]));
    });
    komoo.event.trigger(this, 'coordinates_changed');
}