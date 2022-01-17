function(options, moduleName) {
    var mods = [];
    if (options.modules) {
        mods = options.modules.replace(/ /g, '').split();
    }
    if (!mods.length) {
        mods.push(moduleName);
    }
    options.modules = [];
    var ypath = path.join(process.cwd(), '../../build/yui-nodejs/yui-nodejs.js');
    if (exists(ypath)) {
        if (!YUI) {
            YUI = require(ypath).YUI;
        }
        var Y = YUI();
        var loader = new Y.Loader({
            ignoreRegistered: true
        });
        loader.require(mods);
        var out = loader.resolve(true);
        out.jsMods.forEach(function(i) {
            options.modules.push(i.name);
            parseModuleMeta(i.name, true);
        });
    } else {
        console.error('[error]'.bold.red, 'Could not find yui-nodejs seed to parse upstream');
    }

    options.modules = options.modules.join(',');
    return options;
}