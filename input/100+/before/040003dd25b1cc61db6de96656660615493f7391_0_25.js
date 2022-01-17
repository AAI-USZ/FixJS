function (type, overlayType) {
    if (!overlayType) {
        overlayType = type;
        type = this.type;
    }
    this.type = type;
    this.setEditMode(komoo.EditMode.DRAW);
    this.setCurrentOverlay(null);  // Remove the overlay selection
    this.drawingMode_ = this.drawingMode[overlayType];
    this.drawingManager.setDrawingMode(this.drawingMode_);
    var OverlayTypeTitle = {};
    OverlayTypeTitle[komoo.OverlayType.POLYGON] = gettext("Add shape");
    OverlayTypeTitle[komoo.OverlayType.POLYLINE] = gettext("Add line");
    OverlayTypeTitle[komoo.OverlayType.POINT] = gettext("Add point");
    $(".map-panel-title", this.addPanel).text(OverlayTypeTitle[overlayType]);
    if (this.overlayOptions[this.type]) {
        var color = this.overlayOptions[this.type].color;
        var border = this.overlayOptions[this.type].border;
        var zIndex = this.overlayOptions[this.type].zIndex;
        this.drawingManagerOptions.polylineOptions.strokeColor = border;
        this.drawingManagerOptions.polygonOptions.fillColor = color;
        this.drawingManagerOptions.polygonOptions.strokeColor = border;
        this.drawingManagerOptions.polygonOptions.zIndex = zIndex;
    }
}