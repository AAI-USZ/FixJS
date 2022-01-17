function (invokeInfo) {
    var invokeTargets = app.getInfo().invokeTargets;

    if (!invokeTargets) {
        cons.log("The application cannot be invoked, please add a rim:invoke-target node in config.xml");
        return;
    }

    if (invokeTargets.some(function (target) {
        return target.filter.some(function (filter) {
            return (
                ((filter.property && filter.property[0]["@attributes"].var === "exts" && filter.property[0]["@attributes"].value.split(",").some(function (value) {
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
        });
    })) {
        _apply('invoked', [invokeInfo]);
    }
    else {
        cons.log("Cannot invoke application, values enter to not match values in rim:invoke-target in config.xml");
    }
}