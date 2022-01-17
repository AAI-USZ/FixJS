function (feature, id) {
    var featureType;
    if (typeof feature == "string") {
        featureType = feature;
        feature = this.getFeature(featureType, id);
    }
    if (!feature) {
        return false;
    }

    this.panTo(feature.getCenter(), false);
    return true;
}