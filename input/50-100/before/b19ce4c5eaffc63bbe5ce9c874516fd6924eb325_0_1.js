function (feature) {
        var featureFound = accessObj.features.reduce(function (found, currElem) {
                return found || currElem.id === feature.id;
            }, false);

        if (!featureFound) {
            accessObj.features.push(feature);
        }
    }