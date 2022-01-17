function (feature) {
    var feature_ = new komoo.features.Feature();
    if (feature) {
        feature_.setProperties(feature.properties);
        var geometry = komoo.geometries.makeGeometry(feature);
        feature_.setGeometry(geometry);
    }

    return feature_;
}