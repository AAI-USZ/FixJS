function put_parameter(sammy, mandatory_keys, num_keys) {
    for (var i in sammy.params) {
        if (i === 'length' || !sammy.params.hasOwnProperty(i)) continue;
        if (sammy.params[i] == '' && mandatory_keys.indexOf(i) == -1) {
            delete sammy.params[i];
        }
        else if (num_keys.indexOf(i) != -1) {
            sammy.params[i] = parseInt(sammy.params[i]);
        }
    }
    var params = {"component": sammy.params.component,
                  "key":       sammy.params.key,
                  "value":     params_magic(sammy.params)};
    delete params.value.component;
    delete params.value.key;
    sammy.params = params;
    if (sync_put(sammy, '/parameters/:component/:key')) update();
}