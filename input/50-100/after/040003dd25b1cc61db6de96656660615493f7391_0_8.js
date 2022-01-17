function (category, index, orig) {
        if (komooMap.featuresByType[type][category]) {
            komooMap.featuresByType[type][category].forEach(function (feature, index, orig) {
                if (!opt_strict || !feature.getProperties().categories || feature.getProperties().categories.length == 1) {
                    features.push(feature);
                }
            });
        }
    }