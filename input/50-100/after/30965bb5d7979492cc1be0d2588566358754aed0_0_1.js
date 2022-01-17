function (key) {
    if (!key || typeof key !== "string") {
        throw new Error("Resource key must be a valid string.");
    }
    var object = WinJS.Resources.getString(key);
    if (object.empty) {
        throw new Error("Resource with key '" + key + "' not found.");
    }
    return object.value;
}