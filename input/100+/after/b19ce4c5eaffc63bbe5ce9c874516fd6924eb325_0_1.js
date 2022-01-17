function createAccessListObj(featuresArray, uri, allowSubDomain) {
    var accessObj = {
            features: [],
            uri: uri,
            allowSubDomain: allowSubDomain
        },
        attribs;
    if (featuresArray) {
        featuresArray.forEach(function (feature) {
            attribs = feature["@"];
            
            if (attribs) {
                attribs.required = packagerUtils.toBoolean(attribs.required, true);
            }
            accessObj.features.push(attribs);
        });
    }

    // always add global features to whitelist
    GLOBAL_FEATURES.forEach(function (feature) {
        var featureFound = accessObj.features.reduce(function (found, currElem) {
                if (currElem) {
                    return found || currElem.id === feature.id;
                }
            }, false);
        
        if (!featureFound) {
            accessObj.features.push(feature);
        }
    });

    return accessObj;
}