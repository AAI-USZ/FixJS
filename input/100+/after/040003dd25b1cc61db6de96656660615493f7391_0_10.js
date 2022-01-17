function () {
    // TODO: Refactoring
    var komooMap = this;
    this.options.featureTypes.forEach(function (type, index, orig) {
        var opts = {
            map: komooMap
        };
        komooMap.featuresByType[type.type] = {categories: type.categories};
        komooMap.featuresByType[type.type].categories.push("uncategorized");
        komooMap.featuresByType[type.type].forEach = function (callback) {
            this.categories.forEach(function (item, index, orig) {
                callback(komooMap.featuresByType[type.type][item], item, orig);
            });
        };
        komooMap.featuresByType[type.type]["uncategorized"] = komoo.collections.makeFeatureCollection(opts);
        if (type.categories.length) {
            type.categories.forEach(function(category, index_, orig_) {
                komooMap.featuresByType[type.type][category] = komoo.collections.makeFeatureCollection(opts);
            });
        }
    });
}