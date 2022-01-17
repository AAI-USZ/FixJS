function (item1, item2) {
    for (var key in item2) {
        var value1 = item1[key];
        var value2 = item2[key];
        if ((typeof (value1) == "object") && (typeof (value2) == "object")) {
            Pit.JsCommon.equality(value1, value2);
        }
        else {
            if (value1 !== value2) {
                return false;
            }
        }
    }
    return true;
}