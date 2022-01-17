function processWidgetData(data, widgetConfig, session, extManager) {
    var localFeatures, attribs, featureArray;

    if (data["@"]) {
        widgetConfig.version = data["@"].version;
        widgetConfig.id = data["@"].id;
    }

    widgetConfig.hasMultiAccess = false; // Default value of hasMultiAccess is false
    widgetConfig.accessList = [];

    
    //set locally available features to access list
    if (data.feature) {
        featureArray = packagerUtils.isArray(data.feature) ? data.feature : [data.feature];
    }
    
    localFeatures = createAccessListObj(featureArray, "WIDGET_LOCAL", true, extManager);
    widgetConfig.accessList.push(localFeatures);

    //add whitelisted features to access list
    if (data.access) {
        //If there is only one access list element, it will be parsed as an object and not an array
        if (!packagerUtils.isArray(data.access)) {
            data.access = [data.access];
        }

        data.access.forEach(function (accessElement) {
            attribs = accessElement["@"];

            if (attribs) {
                if (attribs.uri === "*") {
                    if (accessElement.feature) {
                        throw localize.translate("EXCEPTION_FEATURE_DEFINED_WITH_WILDCARD_ACCESS_URI"); 
                    }
                    
                    widgetConfig.hasMultiAccess = true;
                } else {
                    //set features for this access list
                    if (accessElement.feature) {
                        featureArray = packagerUtils.isArray(accessElement.feature) ? accessElement.feature : [accessElement.feature];
                    } else {
                        featureArray = undefined;
                    }

                    attribs.subdomains = packagerUtils.toBoolean(attribs.subdomains);
                    widgetConfig.accessList.push(createAccessListObj(featureArray, attribs.uri, attribs.subdomains, extManager));
                }
            }
        });
    }
}