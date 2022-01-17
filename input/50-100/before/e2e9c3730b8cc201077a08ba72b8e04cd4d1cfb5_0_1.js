function (obj) {
    var ret = false;
    if (isUndefinedOrNull(obj)) {
        ret = true;
    } else if (isString(obj) || isArray(obj)) {
        ret = obj.length === 0;
    } else if (isBoolean(obj) && !obj) {
        ret = true;
    } else if (isObject(obj) && isEmpty(obj)) {
        ret = true;
    }
    return ret;
}