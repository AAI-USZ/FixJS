function (type, index, orig) {
        var opts = {
            map: komooMap
        };
        komooMap.overlaysByType[type.type] = {categories: type.categories};
        komooMap.overlaysByType[type.type].categories.push("uncategorized");
        komooMap.overlaysByType[type.type].forEach = function (callback) {
            this.categories.forEach(function (item, index, orig) {
                callback(komooMap.overlaysByType[type.type][item], item, orig);
            });   
        };
        komooMap.overlaysByType[type.type]["uncategorized"] = komoo.collections.makeFeatureCollection(opts);
        if (type.categories.length) {
            type.categories.forEach(function(category, index_, orig_) {
                komooMap.overlaysByType[type.type][category] = komoo.collections.makeFeatureCollection(opts);
            });
        }
    }