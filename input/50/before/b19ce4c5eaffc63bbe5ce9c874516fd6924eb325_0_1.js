function (feature) {
            attribs = feature["@"];

            attribs.required = packagerUtils.toBoolean(attribs.required, true);

            accessObj.features.push(attribs);
        }