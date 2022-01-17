function nativeRequire(name) {
        var code, func, exports;

        if (name === 'webpage' || name === 'fs' || name === 'webserver' || name === 'system') {
            code = phantom.loadModuleSource(name);
            func = new Function("exports", "window", code);
            exports = {};
            if (name === 'fs') {
                exports = phantom.createFilesystem();
            } else if (name === 'system') {
                exports = phantom.createSystem();
            }
            func.call({}, exports, {});
            return exports;
        }

        if (typeof exports === 'undefined') {
            throw 'Unknown module ' + name + ' for require()';
        }
    }