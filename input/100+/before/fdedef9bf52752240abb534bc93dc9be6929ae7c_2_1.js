function js_to_type(obj) {
    if (obj === true)
        return exports.mksymbol("true");
    if (obj === false)
        return exports.mksymbol("false");
    if (_.isString(obj))
        return { type: "string", value: obj };
    if (SchemeNumber.fn["number?"](obj))
        return { type: "number", value: obj };
    if (_.isNumber(obj))
        return { type: "number", value: new SchemeNumber(obj) };
    if (_.isArray(obj)) {
        return obj.map(js_to_type);
    }
    throw "object " + obj + " cannot be converted to a type";
}