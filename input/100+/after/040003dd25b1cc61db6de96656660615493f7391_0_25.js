function (type, featureType) {
    if (!featureType) {
        featureType = type;
        type = this.type;
    }
    this.type = type;
    this.setEditMode(komoo.EditMode.DRAW);
    this.setCurrentFeature(null);  // Remove the feature selection
    this.drawingMode_ = this.drawingMode[featureType];
    this.drawingManager.setDrawingMode(this.drawingMode_);
    var FeatureTypeTitle = {};
    FeatureTypeTitle[komoo.GeometryType.POLYGON] = gettext("Add shape");
    FeatureTypeTitle[komoo.GeometryType.POLYLINE] = gettext("Add line");
    FeatureTypeTitle[komoo.GeometryType.POINT] = gettext("Add point");
    $(".map-panel-title", this.addPanel).text(FeatureTypeTitle[featureType]);
    if (this.featureOptions[this.type]) {
        var color = this.featureOptions[this.type].color;
        var border = this.featureOptions[this.type].border;
        var zIndex = this.featureOptions[this.type].zIndex;
        this.drawingManagerOptions.polylineOptions.strokeColor = border;
        this.drawingManagerOptions.polygonOptions.fillColor = color;
        this.drawingManagerOptions.polygonOptions.strokeColor = border;
        this.drawingManagerOptions.polygonOptions.zIndex = zIndex;
    }
}