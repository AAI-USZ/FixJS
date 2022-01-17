function (len) {
    var lines = this.object_.getPolylines();
    var missing;
    if (lines.length > len) {
        missing = lines.length - len;
        for (var i=0; i<missing; i++) {
             lines.pop();
        }
    } else if (lines.length < len) {
        missing = len - lines.length;
        for (var i=0; i<missing; i++) {
            this.object_.addPolyline(new komoo.geometries.Polyline(this.options_));
        }
    }
}