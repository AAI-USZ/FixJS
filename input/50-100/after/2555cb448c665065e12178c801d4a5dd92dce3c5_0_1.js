function loadFs() {
        var file, code, module, filename = ':/modules/fs.js';
        
        module = new Module(filename);
        cache[filename] = module;
        module.exports = nativeExports.fs;

        file = module.exports._open(filename, { mode: 'r' })
        code = file.read();
        file.close();
        module._compile(code);

        return module.exports;
    }