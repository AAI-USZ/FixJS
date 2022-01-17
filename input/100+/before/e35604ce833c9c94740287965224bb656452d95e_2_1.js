function (name, tableFillFn) {
        var lastSegIdx = name.lastIndexOf("."),
            namespace = name.substring(0, lastSegIdx),
            oscName = name.substring(lastSegIdx + 1),
            namespaceObj = flock.resolvePath(namespace);
        
        namespaceObj[oscName] = function (inputs, output, options) {
            var defaultSettings = flock.defaults("flock.audioSettings"),
                size = (options && options.tableSize) || defaultSettings.tableSize,
                scale = flock.TWOPI / size;
            inputs.table = tableFillFn(size, scale);
            return flock.ugen.osc(inputs, output, options);
        };
        
        flock.defaults(name, flock.defaults("flock.ugen.osc"));
    }