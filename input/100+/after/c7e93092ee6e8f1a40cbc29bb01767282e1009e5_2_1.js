function (accessElement) {
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
        }