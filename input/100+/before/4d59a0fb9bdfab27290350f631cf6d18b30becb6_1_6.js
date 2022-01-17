function (map, opt_force) {
    //if (map == this.map_ && force == undefined) return;

    var force = opt_force != undefined ? opt_force : {geometries: false, markers: false};
    if (this.getProperties().alwaysVisible) force = {geometries: true, markers: false};
    var zoom = 0;
    if (map) zoom = map.getZoom();
    if (map && ((zoom <= this.maxZoomGeometry && zoom >= this.minZoomGeometry) || force.geometries)) {
        this.geometry_.setMap(map);
    } else {
        this.geometry_.setMap(null);
    }
    if (this.marker_) {
        if (map && ((zoom <= this.maxZoomMarker && zoom >= this.minZoomMarker) || force.markers)) {
            this.getMarker().setMap(map);
        } else {
            this.getMarker().setMap(null);
        }
    }
    this.map_ = map;
}