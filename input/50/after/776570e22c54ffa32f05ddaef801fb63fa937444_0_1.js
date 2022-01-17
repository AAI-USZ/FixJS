function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);
        return [mitnk_mdict_json_to_dom.namespaces[m[1]], m[2]];
    }