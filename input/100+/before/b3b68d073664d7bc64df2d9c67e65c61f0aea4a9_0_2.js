function(request) {
        var filename, module;

        // first see if there are any stubs for the request
        if (this.stubs.hasOwnProperty(request)) {
            return this.stubs[request].exports;
        }

        // then try loading a native module
        if (nativeModules.indexOf(request) !== -1) {
            return nativeRequire(request);
        }

        // else look for a file
        filename = this._getFilename(request);
        if (!filename) {
            throw new Error("Cannot find module '" + request + "'");
        }

        if (cache.hasOwnProperty(filename)) {
            return cache[filename].exports;
        }

        module = new Module(filename, this.stubs);
        cache[filename] = module;
        module._load();

        return module.exports;
    }