function() {
    window.global = window;

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

    function dirname(path) {
        return path.replace(/\/[^\/]*\/?$/, '');
    };

    function basename(path) {
        return path.replace(/.*\//, '');
    };

    function joinPath() {
        var args = Array.prototype.slice.call(arguments);
        return args.join(fs.separator);
    };

    var fs = nativeRequire('fs');
    var phantomModules = ['fs', 'webpage', 'webserver', 'system'];

    var rootPath = fs.absolute(phantom.libraryPath);
    var mainScript = joinPath(rootPath, basename(nativeRequire('system').args[0]) || 'repl');
    var sourceIds = {};

    var cache = {};
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

    function tryFile(path) {
        if (fs.isFile(path)) return path;
        return null;
    }

    function tryExtensions(path) {
        var filename;
        var exts = Object.keys(extensions);
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
        this.id = this.filename = filename;
        this.dirname = dirname(filename);
        this.exports = {};
        this.stubs = {};
        for (var name in stubs) {
            this.stubs[name] = stubs[name];
        }
    }

    Module.prototype._getPaths = function(request) {
        var paths = [], dir;

        if (request[0] === '.') {
            paths.push(fs.absolute(joinPath(this.dirname, request)));
        } else if (request[0] === '/') {
            paths.push(fs.absolute(request));
        } else {
            dir = this.dirname;
            while (dir !== '') {
                paths.push(joinPath(dir, 'node_modules', request));
                dir = dirname(dir);
            }
            //paths.push(joinPath(nodifyPath, 'modules', request));
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
        var ext = this.filename.match(/\.[^.]+$/);
        if (!ext) ext = '.js';
        extensions[ext](this, this.filename);
    };

    Module.prototype._compile = function(code) {
        // a trick to associate Error's sourceId with file
        code += ";throw new Error('__sourceId__');";
        try {
            var fn = new Function('require', 'exports', 'module', code);
            fn(this._getRequire(), this.exports, this);
        } catch (e) {
            // assign source id (check if already assigned to avoid reassigning
            // on exceptions propagated from other files)
            if (!sourceIds.hasOwnProperty(e.sourceId)) {
                sourceIds[e.sourceId] = this.filename;
            }
            // if it's not the error we added, propagate it
            if (e.message !== '__sourceId__') {
                throw e;
            }
        }
    };

    Module.prototype.require = function(request) {
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
    };

    window.require = new Module(mainScript)._getRequire();
}