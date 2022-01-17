function (feature, id) {
    var featureType;
    if (typeof feature == "string") {
        featureType = feature;
        feature = this.getFeature(featureType, id);
    }

    if (!feature) return false;
    if (feature.isHighlighted()) return true;

    if (this.featureHighlighted) this.featureHighlighted.setHighlight(false);
    feature.setHighlight(true);
    this.closeInfoWindow();
    this.openInfoWindow({feature:feature, position:feature.getCenter()});

    this.featureHighlighted = feature;
    return true;
}