function (mfile, opts) {
    var self = this;
    if (!opts) opts = {};
    if (!opts.dirname) opts.dirname = process.cwd();
    
    if (typeof mfile === 'object') {
        throw new Error('require maps no longer supported');
    }
    
    if (self.has(mfile)) return self;
    if (opts.target && self.has(opts.target)) return self;
    
    if (self.ignoring[mfile]) return self;
    if (self.aliases[mfile]) return self;
    
    var pkg = {};
    if (resolve.isCore(mfile)) {
        opts.file = path.resolve(__dirname, '../builtins/' + mfile + '.js');
        opts.target = opts.target || mfile;
        
        if (!path.existsSync(opts.file)) {
            try {
                require.resolve(mfile + '-browserify');
                opts.body = 'module.exports = require('
                    + JSON.stringify(mfile + '-browserify')
                + ')';
            }
            catch (err) {
                throw new Error('No wrapper for core module ' + mfile);
            }
        }
    }
    else if (self.has(mfile)) {
        // package has already been included in some fashion, no need to resolve
        return self;
    }
    else if (opts.body) {
        opts.file = mfile;
    }
    else if (!opts.file) {
        try {
            var pathLikeResolverLikesIt = path.normalize(path.resolve(mfile)) === path.normalize(mfile) ? path.normalize(mfile) : mfile;
            opts.file = self.resolver(pathLikeResolverLikesIt, opts.dirname);
        }
        catch (err) {
            throw new Error('Cannot find module ' + JSON.stringify(mfile)
                + ' from directory ' + JSON.stringify(opts.dirname)
                + (opts.fromFile ? ' while processing file ' + opts.fromFile : '')
            );
        }
    }
    
    if (self.has(opts.file)) return self;
    
    var dirname = path.dirname(opts.file);
    var pkgfile = path.join(dirname, 'package.json');
    
    if (!mfile.match(/^(\.\.?)?\//)) {
        try {
            pkgfile = resolve.sync(path.join(mfile, 'package.json'), {
                basedir : dirname
            });
        }
        catch (err) {}
    }
     
    if (pkgfile && !self._checkedPackages[pkgfile]) {
        self._checkedPackages[pkgfile] = true;
        if (path.existsSync(pkgfile)) {
            var pkgBody = fs.readFileSync(pkgfile, 'utf8');
            try {
                var npmpkg = JSON.parse(pkgBody);
                if (npmpkg.main !== undefined) {
                    pkg.main = npmpkg.main;
                }
                if (npmpkg.browserify !== undefined) {
                    pkg.browserify = npmpkg.browserify;
                }
            }
            catch (err) {
                // ignore broken package.jsons just like node
            }
            
            self.files[pkgfile] = {
                body : 'module.exports = ' + JSON.stringify(pkg),
            };
        }
    }
    
    var body = opts.body || self.readFile(opts.file);
    var entry = self.files[opts.file] = {
        body : body,
        target : opts.target
    };
    
    try {
        var required = self.detective.find(body);
    }
    catch (err) {
        process.nextTick(function () {
            self.emit('syntaxError', err);
        });
        return self;
    }
    
    if (pkg.browserify && pkg.browserify.require) {
        required.strings = required.strings.concat(
            pkg.browserify.require
        );
    }
    
    if (required.expressions.length) {
        console.error('Expressions in require() statements:');
        required.expressions.forEach(function (ex) {
            console.error('    require(' + ex + ')');
        });
    }
    
    nub(required.strings).forEach(function (req) {
        var params = {
            dirname : dirname,
            fromFile : opts.file,
        };
        if (opts.target && /^[.\/]/.test(req)) {
            // not a real directory on the filesystem; just using the path
            // module to get rid of the filename.
            var targetDir = path.dirname(opts.target);
            // not a real filename; just using the path module to deal with
            // relative paths.
            var reqFilename = path.resolve(targetDir, req);
            // get rid of drive letter on Windows; replace it with '/'
            var reqFilenameWithoutDriveLetter = /^[A-Z]:\\/.test(reqFilename) ?
                '/' + reqFilename.substring(3) : reqFilename;

            params.target = idFromPath(reqFilenameWithoutDriveLetter);
        }
        self.require(req, params);
    });
    
    return self;
}