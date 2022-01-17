function include(parent, featureIdList) {
    var featureId,
        featureProperties,
        localUrl,
        i;

    for (i = 0; i < featureIdList.length; i++) {
        featureId = featureIdList[i];

        localUrl = "local://ext/" + featureId + "/client.js";
        featureProperties = requireLocal(localUrl);

        buildNamespace(parent, featureId.split("."), featureProperties);
    }
}