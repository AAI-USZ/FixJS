function (key) {
    if (!key || typeof key !== "string") {
        throw new Error("Resource key must be a valid string");
    }
    return WinJS.Resources.getString(key).value;
}