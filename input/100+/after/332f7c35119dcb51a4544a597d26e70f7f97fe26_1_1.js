function (filter) {
            return (
                (!filter.property ||
                (filter.property && filter.property[0]["@attributes"].var === "exts" && filter.property[0]["@attributes"].value.split(",").some(function (value) {
                    return invokeInfo.extension.match(value);
                })) ||
                (filter.property && filter.property[0]["@attributes"].var === "uris" && filter.property[0]["@attributes"].value.split(",").some(function (value) {
                    return invokeInfo.source.match(value);
                }))) &&
                filter.action.some(function (action) {
                    return invokeInfo.action.match(action["#text"][0].replace("*", ""));
                }) &&
                filter["mime-type"].some(function (type) {
                    return invokeInfo.mimeType.match(type["#text"][0].replace("*", ""));
                })
            );
        }