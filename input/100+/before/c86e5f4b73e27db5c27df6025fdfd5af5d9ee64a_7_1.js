function runCode(filename, context) {
    var isCoffee = filename.match(/coffee$/);

    context = context || {};

    var dirname = path.dirname(filename);

    // extend context
    context.require = context.require || function (apath) {
        var isRelative = apath.match(/^\.\.?\//);
        return require(isRelative ? path.resolve(dirname, apath) : apath);
    };
    context.app = app;
    context.railway = railway;
    context.console = console;
    context.setTimeout = setTimeout;
    context.setInterval = setInterval;
    context.clearTimeout = clearTimeout;
    context.clearInterval = clearInterval;
    context.__filename = filename;
    context.__dirname = dirname;
    context.process = process;
    context.t = context.t || t;
    context.Buffer = Buffer;

    // omit file reading and caching part if we have compiled script
    if (!scriptCache[filename]) {

        cache[filename] = cache[filename] || filename && path.existsSync(filename) && require('fs').readFileSync(filename);
        if (!cache[filename]) {
            return;
        }
        var code = cache[filename].toString();
        if (isCoffee) {
            try {
                var cs = require('coffee-script');
            } catch (e) {
                throw new Error('Please install coffee-script npm package: `npm install coffee-script`');
            }
            try {
                code = require('coffee-script').compile(code);
            } catch (e) {
                console.log('Error in coffee code compilation in file ' + filename);
                throw e;
            }
        } else {
            code = addCoverage(code, filename);
        }
    }

    try {
        var m;
        if (scriptCache[filename]) {
            m = scriptCache[filename];
        } else {
            m = vm.createScript(code.toString('utf8'), filename);
            scriptCache[filename] = m;
        }
        m.runInNewContext(context);
    } catch (e) {
        console.log('Error while executing ' + filename);
        throw e;
    }

    // disable caching in development mode
    if (app.disabled('eval cache')) {
        cache[filename] = null;
        scriptCache[filename] = null;
    }
}