function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);
        return [jsonToDOM.namespaces[m[1]], m[2]];
    }