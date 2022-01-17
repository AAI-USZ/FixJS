function (type, opt_categories, opt_strict) {
    var komooMap = this;
    var features = new komoo.collections.makeFeatureCollection({map: this});
    var categories = opt_categories;
    if (!this.featuresByType[type]) {
        return false;
    }
    if (!categories) {
        categories = [];
        this.featuresByType[type].forEach(function (features, category, orig) {
            categories.push(category);
        });
    } else if (categories.length === 0) {
        categories = ["uncategorized"];
    }
    categories.forEach(function (category, index, orig) {
        if (komooMap.featuresByType[type][category]) {
            komooMap.featuresByType[type][category].forEach(function (feature, index, orig) {
                if (!opt_strict || !feature.getProperties().categories || feature.getProperties().categories.length == 1) {
                    features.push(feature);
                }
            });
        }
    });
    return features;
}