function collapse_multifields(params0) {
    var params = {};
    for (key in params0) {
        var match = key.match(/([a-z]*)_([0-9]*)_mfkey/);
        var match2 = key.match(/[a-z]*_[0-9]*_mfvalue/);
        if (match == null && match2 == null) {
            params[key] = params0[key];
        }
        else if (match == null) {
            // Do nothing, value is handled below
        }
        else {
            var name = match[1];
            var id = match[2];
            if (params[name] == undefined) {
                params[name] = {};
            }
            if (params0[key] != "") {
                var k = params0[key];
                var v = params0[name + '_' + id + '_mfvalue'];
                params[name][k] = v;
            }
        }
    }
    return params;
}