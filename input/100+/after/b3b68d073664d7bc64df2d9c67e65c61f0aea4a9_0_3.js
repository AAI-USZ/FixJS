function() {
    // CommonJS module implementation follows

    window.global = window;
    // fs is loaded at the end, when everything is ready
    var fs;
    var cache = {};
    // use getters to initialize lazily
    // (for future, now both fs and system are loaded anyway)
    var nativeExports = {
        get fs() { return phantom.createFilesystem(); },
        get system() { return phantom.createSystem(); }
    };
    var extensions = {
        '.js': function(module, filename) {
            var code = fs.read(filename);
            module._compile(code);
        },

        '.coffee': function(module, filename) {
            var code = fs.read(filename);
            var CoffeeScript = require('_coffee-script');
            try {
                code = CoffeeScript.compile(code);
            } catch (e) {
                e.fileName = filename;
                throw e;
            }
            module._compile(code);
        },

        '.json': function(module, filename) {
            module.exports = JSON.parse(fs.read(filename));
        }
    };
    
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

    function dirname(path) {
        return path.replace(/\/[^\/]*\/?$/, '');
    }

    function basename(path) {
        return path.replace(/.*\//, '');
    }

    function joinPath() {
        var args = Array.prototype.slice.call(arguments);
        return args.join(fs.separator);
    }

    function tryFile(path) {
        if (fs.isFile(path)) return path;
        return null;
    }

    function tryExtensions(path) {
        var filename, exts = Object.keys(extensions);
        for (var i=0; i<exts.length; ++i) {
            filename = tryFile(path + exts[i]);
            if (filename) return filename;
        }
        return null;
    }

    function tryPackage(path) {
        var filename, package, packageFile = joinPath(path, 'package.json');
        if (fs.isFile(packageFile)) {
            package = JSON.parse(fs.read(packageFile));
            if (!package || !package.main) return null;

            filename = fs.absolute(joinPath(path, package.main));

            return tryFile(filename) || tryExtensions(filename) ||
                tryExtensions(joinPath(filename, 'index'));
        }
        return null;
    }

    function Module(filename, stubs) {
        if (filename) this._setFilename(filename);
        this.exports = {};
        this.stubs = {};
        for (var name in stubs) {
            this.stubs[name] = stubs[name];
        }
    }

    Module.prototype._setFilename = function(filename) {
        this.id = this.filename = filename;
        this.dirname = dirname(filename);
    };

    Module.prototype._isNative = function() {
        return this.filename[0] === ':';
    }

    Module.prototype._getPaths = function(request) {
        var paths = [], dir;

        if (request[0] === '.') {
            paths.push(fs.absolute(joinPath(this.dirname, request)));
        } else if (request[0] === '/') {
            paths.push(fs.absolute(request));
        } else {
            // first look in PhantomJS modules
            paths.push(joinPath(':/modules', request));
            // then look in node_modules directories
            dir = this.dirname;
            while (dir) {
                paths.push(joinPath(dir, 'node_modules', request));
                dir = dirname(dir);
            }
        }

        return paths;
    };

    Module.prototype._getFilename = function(request) {
        var path, filename = null, paths = this._getPaths(request);

        for (var i=0; i<paths.length && !filename; ++i) {
            path = paths[i];
            filename = tryFile(path) || tryExtensions(path) || tryPackage(path) ||
                tryExtensions(joinPath(path, 'index'));
        }

        return filename;
    };

    Module.prototype._getRequire = function() {
        var self = this;

        function require(request) {
            return self.require(request);
        }
        require.cache = cache;
        require.stub = function(request, exports) {
            self.stubs[request] = { exports: exports };
        };

        return require;
    };

    Module.prototype._load = function() {
        var ext = this.filename.match(/\.[^.]+$/)[0];
        if (!ext) ext = '.js';
        extensions[ext](this, this.filename);
    };

    Module.prototype._compile = function(code) {
        phantom.loadModule(code, this.filename);
    };

    Module.prototype.require = function(request) {
        var filename, module;

        // first see if there are any stubs for the request
        if (this.stubs.hasOwnProperty(request)) {
            return this.stubs[request].exports;
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
        if (module._isNative()) {
            module.exports = nativeExports[request] || {};
        }
        cache[filename] = module;
        module._load();

        return module.exports;
    };

    (function() {
        var cwd, mainFilename, mainModule = new Module();
        window.require = mainModule._getRequire();
        fs = loadFs();
        cwd = fs.absolute(phantom.libraryPath);
        mainFilename = joinPath(cwd, basename(require('system').args[0]) || 'repl');
        mainModule._setFilename(mainFilename);
    }());
}