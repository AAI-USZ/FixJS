function(str) {
    if (!str || str == "0000-00-00T00:00:00") return null;
    if (typeof str == "string") {
        var val = new Date(str.replace(/-/g, "/").replace(/[TZ]/g, " "));
        return val && val != "undefined" ? val : null;
    }
    return str;
}