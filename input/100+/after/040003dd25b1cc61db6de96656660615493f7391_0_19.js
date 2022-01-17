function (feature, opt_force) {
    //if (this.currentFeature == feature && !opt_force) return;
    $("#komoo-map-add-button, #komoo-map-cut-out-button, #komoo-map-delete-button").hide();
    this.currentFeature = feature;
    if (this.currentFeature && this.currentFeature.getProperties() &&
            this.currentFeature.getProperties().userCanEdit) {
        this.currentFeature.setEditable(true);
        if (this.currentFeature.getGeometry().getGeometryType() == 'Polygon') {
            this.drawingMode_ = komoo.GeometryType.POLYGON;
            $("#komoo-map-cut-out-button").show();
        } else if (this.currentFeature.getGeometry().getGeometryType() == 'LineString' ||
                   this.currentFeature.getGeometry().getGeometryType() == 'MultiLineString') {
            this.drawingMode_ = komoo.GeometryType.POLYLINE;
        } else {
            this.drawingMode_ = komoo.GeometryType.POINT;
        }
        $("#komoo-map-add-button, #komoo-map-delete-button").show();
    }
}