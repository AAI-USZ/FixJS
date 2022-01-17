function (len) {
    var points = this.overlay_.getMarkers();
    var missing;
    if (points.length > len) {
        missing = points.length - len;
        for (var i=0; i<missing; i++) {
             points.pop();
        }
    } else if (points.length < len) {
        missing = len - points.length;
        for (var i=0; i<missing; i++) {
            this.overlay_.addMarker(new komoo.geometries.Point());
        }
    }
}