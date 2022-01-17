function (projectDir, unixId) {
    
    this.$normalizeCallback = function (fn) {
        if (typeof fn !== "function") {
            return function () {};
        }
        
        return fn;
    };
    
    /**
     * Resolves the path given a path relative to a project folder
     */
    this.$resolvePath = function (relativePath, callback) {
        var path = Path.join(projectDir, relativePath);
        path = Path.normalize(path);
        
        if (path.indexOf(projectDir) !== 0) {
            return callback("Can't step out project dir... " + path);
        }
        
        callback(null, path);
    };
    
    /**
     * Wrapper around Path.exists
     */
    this.exists = function (path, callback) {
        var self = this;
        
        callback = this.$normalizeCallback(callback);
        
        self.$resolvePath(path, function (err, path) {
            if (err) return callback(err);
            
            Path.exists(path, function (exists) {
                callback(null, exists);
            });
        });
    };
    
    this.$simpleWrapper = function (name, fnArgs) {    
        var path = fnArgs[0];
        var callback = this.$normalizeCallback(fnArgs[fnArgs.length - 1]);
        
        this.$resolvePath(path, function (err, path) {
            if (err) return callback(err);
            
            // first copy the array with slice(0), then remove the first arg
            var args = [].slice.call(fnArgs).slice(1);
            Fs[name].apply(Fs, [path].concat(args));
        });        
    };
    
    this.$chownWrapper = function (name, fnArgs) {
        var path = fnArgs[0];
        var callback = this.$normalizeCallback(fnArgs[fnArgs.length - 1]);
        
        this.$resolvePath(path, function (err, path) {
            if (err) return callback(err);
            
            // first copy the array with slice(0), then remove the first arg
            var args = [].slice.call(fnArgs).slice(1);
            
            // pop the last argument cause we want to override it (if its a function of course)
            var lastArg = args.pop();
            if (typeof lastArg === "function") {
                lastArg = function (err) {
                    if (err) return callback(err);
                    
                    if (!unixId) {
                        return callback();
                    }
                    
                    Fs.chown(path, unixId, unixId, function (err) {
                        if (err) return callback(err);
                        
                        // @todo, do a chmod here?
                        
                        callback();
                    });
                };
            }
            
            Fs[name].apply(Fs, [path].concat(args).concat([lastArg]));
        }); 
    };
        
    /**
     * Wrapper around fs.readFile
     */
    this.readFile = function () {
        return this.$simpleWrapper.call(this, "readFile", arguments);
    };
    
    /**
     * Wrapper around fs.writeFile
     */
    this.writeFile = function () {
        return this.$chownWrapper.call(this, "writeFile", arguments); 
    };
    
    /**
     * Wrapper around chmod
     */
    this.chmod = function () {
        return this.$simpleWrapper.call(this, "chmod", arguments);
    };
    
    /**
     * Wrapper around readdir
     */
    this.readdir = function () {
        return this.$simpleWrapper.call(this, "readdir", arguments);     
    };
    
    /**
     * Wrapper around open
     */
    this.open = function () {
        return this.$simpleWrapper.call(this, "open", arguments);     
    };
    
    /**
     * Wrapper around write
     */
    this.write = function () {
        Fs.write.apply(this, arguments);
    };
    
    /**
     * Wrapper around close
     */
    this.close = function () {
        Fs.close.apply(this, arguments);
    };
    
    /**
     * Wrapper around mkdir
     */
    this.mkdir = function () {
        return this.$chownWrapper.call(this, "mkdir", arguments);
    };
}