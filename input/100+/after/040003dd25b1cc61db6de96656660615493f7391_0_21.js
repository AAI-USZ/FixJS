function (feature) {
    if (!feature || !feature.getProperties() || !feature.getProperties().userCanEdit) {
        return false;
    }
    if (feature.setEditable) {
        feature.setEditable(true);
    } else if (feature.setDraggable) {
        feature.setDraggable(true);
    }
    this.type = feature.getProperties().type;
    this.setCurrentFeature(feature, true);
    this.setMode(komoo.Mode.DRAW);
    $(".map-panel-title", this.addPanel).text(gettext("Edit"));
    this.addPanel.css({"margin-top": "33px"});
    this.addPanel.show();
    var color = this.featureOptions[feature.getProperties().type].color;
    var border = this.featureOptions[feature.getProperties().type].border;
    var zIndex = this.featureOptions[feature.getProperties().type].zIndex;
    this.drawingManagerOptions.polylineOptions.strokeColor = border;
    this.drawingManagerOptions.polygonOptions.fillColor = color;
    this.drawingManagerOptions.polygonOptions.strokeColor = border;
    this.drawingManagerOptions.polygonOptions.zIndex = zIndex;
    return true;
}