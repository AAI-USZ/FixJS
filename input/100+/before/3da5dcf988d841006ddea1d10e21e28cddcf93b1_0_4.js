function(request) {
        if (phantomModules.indexOf(request) !== -1) {
            return nativeRequire(request);
        }

        if (this.stubs.hasOwnProperty(request)) {
            return this.stubs[request].exports;
        }

        var filename = this._getFilename(request);
        if (!filename) {
            var e = new Error("Cannot find module '" + request + "'");
            e.fileName = this.filename;
            e.line = '';
            throw e;
        }

        if (cache.hasOwnProperty(filename)) {
            return cache[filename].exports;
        }

        var module = new Module(filename, this.stubs);
        cache[filename] = module;
        module._load();

        return module.exports;
    }