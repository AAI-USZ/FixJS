function (opts) {
    var that = this;
    var options = opts || {};
    var feature = options.feature || {};
    if (feature[this.contentViewName_]) return feature[this.contentViewName_];

    var zoom = this.map_.getZoom();
    var featureType = this.map_.featureOptions[feature.getProperty('type')];
    var appName = featureType.appLabel;
    var modelName = featureType.modelName;
    var id = feature.getProperty('id');

    var url = dutils.urls.resolve(this.contentViewName_,
            {zoom: zoom, app_label: appName, model_name: modelName, obj_id: id});
    // Loads via ajax
    $.get(url, function (data, textStatus, jqXHR) {
        feature[that.contentViewName_] = data;
        that.setContent(data);
    });

    return gettext('Loading...');
}