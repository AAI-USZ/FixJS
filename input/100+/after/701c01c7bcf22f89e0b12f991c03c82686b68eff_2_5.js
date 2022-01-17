function(options) {
      var feature, url,
        _this = this;
      if (options == null) options = {};
      feature = options.feature;
      if (!feature) return;
      if (feature[this.contentViewName]) return feature[this.contentViewName];
      url = dutils.urls.resolve(this.contentViewName, {
        zoom: this.map.getZoom(),
        app_label: feature.featureType.appLabel,
        model_name: feature.featureType.modelName,
        obj_id: feature.getProperty("id")
      });
      $.get(url, function(data) {
        feature[_this.contentViewName] = data;
        return _this.setContent(data);
      });
      return gettext("Loading...");
    }