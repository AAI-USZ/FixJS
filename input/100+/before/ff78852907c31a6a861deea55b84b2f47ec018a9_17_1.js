function(loadpath, matcher, clear) {
    if(clear === true) {
        clearSpecs();
    }
    var wannaBeSpecs = wrench.readdirSyncRecursive(loadpath);
    for (var i = 0; i < wannaBeSpecs.length; i++) {
        var file = path.join(__dirname, loadpath, wannaBeSpecs[i]);
        try {
            if (fs.statSync(file).isFile()) {
                if (!/.*node_modules.*/.test(file) && matcher.test(path.filename(file))) {
                    specs.push(createSpecObj(file));
                }
            }
        } catch(e) {
            // nothing to do here
        }
    }
}