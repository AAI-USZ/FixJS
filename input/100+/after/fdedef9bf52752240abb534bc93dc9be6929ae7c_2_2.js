function pprint(s) {
    if (types.is_function(s))
        return "(lambda " + pprint(s.sig) + " " + s.value.map(pprint).join(" ") + ")";
    if (types.is_primitive(s))
        return "<primitive " + s.value + ">";
    if (types.is_number(s))
        return SchemeNumber.fn["number->string"](s.value);
    if (types.is_string(s))
        return '"' + s.value + '"';
    if (types.is_atom(s))
        return s.value;
    var out = [];
    for (var i = 0, l = s.length, el = s[0]; i < l; el = s[++i]) {
        out.push(pprint(el));
    }
    return "(" + out.join(" ") + ")";
}