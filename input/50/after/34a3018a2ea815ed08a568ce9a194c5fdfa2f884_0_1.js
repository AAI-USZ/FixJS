function (feature) {
            attribs = feature["@"];
            
            if (attribs) {
                attribs.required = packagerUtils.toBoolean(attribs.required, true);
            }
            accessObj.features.push(attribs);
        }