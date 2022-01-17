function nativeRequire(request) {
        var code, module, filename = 'phantomjs://modules/' + request + '.js';
        
        if (cache.hasOwnProperty(filename)) {
            return cache[filename].exports;
        }
        
        code = phantom.readNativeModule(request);
        module = new Module(filename);

        cache[filename] = module;
        module.exports = nativeExports[request] || {};
        module._compile(code);

        return module.exports;
    }