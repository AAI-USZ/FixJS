function (overlay, opt_force) {
    //if (this.currentOverlay == overlay && !opt_force) return;
    $("#komoo-map-add-button, #komoo-map-cut-out-button, #komoo-map-delete-button").hide();
    this.currentOverlay = overlay;
    if (this.currentOverlay && this.currentOverlay.getProperties() &&
            this.currentOverlay.getProperties().userCanEdit) {
        this.currentOverlay.setEditable(true);
        if (this.currentOverlay.getGeometry().getGeometryType() == 'Polygon') {
            this.drawingMode_ = komoo.OverlayType.POLYGON;
            $("#komoo-map-cut-out-button").show();
        } else if (this.currentOverlay.getGeometry().getGeometryType() == 'LineString' ||
                   this.currentOverlay.getGeometry().getGeometryType() == 'MultiLineString') {
            this.drawingMode_ = komoo.OverlayType.POLYLINE;
        } else {
            this.drawingMode_ = komoo.OverlayType.POINT;
        }
        $("#komoo-map-add-button, #komoo-map-delete-button").show();
    }
}