function (feature) {
    var feature_ = new komoo.features.Feature();
    var geometry = komoo.geometries.makeGeometry(feature);

    feature_.setProperties(feature.properties);
    feature_.setGeometry(geometry);

    return feature_;
}