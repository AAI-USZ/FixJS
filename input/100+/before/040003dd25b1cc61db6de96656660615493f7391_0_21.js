function (overlay) {
    if (!overlay || !overlay.getProperties() || !overlay.getProperties().userCanEdit) {
        return false;
    }
    if (overlay.setEditable) {
        overlay.setEditable(true);
    } else if (overlay.setDraggable) {
        overlay.setDraggable(true);
    }
    this.type = overlay.getProperties().type;
    this.setCurrentOverlay(overlay, true);
    this.mode = komoo.Mode.DRAW;
    $(".map-panel-title", this.addPanel).text(gettext("Edit"));
    this.addPanel.css({"margin-top": "33px"});
    this.addPanel.show();
    var color = this.overlayOptions[overlay.getProperties().type].color;
    var border = this.overlayOptions[overlay.getProperties().type].border;
    var zIndex = this.overlayOptions[overlay.getProperties().type].zIndex;
    this.drawingManagerOptions.polylineOptions.strokeColor = border;
    this.drawingManagerOptions.polygonOptions.fillColor = color;
    this.drawingManagerOptions.polygonOptions.strokeColor = border;
    this.drawingManagerOptions.polygonOptions.zIndex = zIndex;
    return true;
}