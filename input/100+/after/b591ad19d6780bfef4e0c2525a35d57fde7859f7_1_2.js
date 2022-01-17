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
                var t = params0[name + '_' + id + '_mftype'];
                if (t == 'boolean') {
                    if (v != 'true' && v != 'false')
                        throw(k + ' must be "true" or "false"; got ' + v);
                    params[name][k] = (v == 'true');
                }
                else if (t == 'number') {
                    var n = parseFloat(v);
                    if (isNaN(n))
                        throw(k + ' must be a number; got ' + v);
                    params[name][k] = n;
                }
                else {
                    params[name][k] = v;
                }
            }
        }
    }
    return params;
}