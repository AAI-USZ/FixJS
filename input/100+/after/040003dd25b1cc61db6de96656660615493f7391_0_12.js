function () {
    var bounds = this.googleMap.getBounds();
    if (!bounds) return [];

    var features = komoo.collections.makeFeaturesCollection();
    this.features.forEach(function (feature, index, orig) {
        if (!feature.getMap() && (feature.getMarker() && !feature.getMarker().getVisible())) {
            // Dont verify the intersection if feature is invisible.
            return;
        }
        if (feature.getBounds()) {
            if (bounds.intersects(feature.getBounds())) {
                features.push(feature);
            }
        } else if (feature.getPosition) {
            if (bounds.contains(feature.getPosition())) {
                features.push(feature);
            }
        }
    });
    return features;
}