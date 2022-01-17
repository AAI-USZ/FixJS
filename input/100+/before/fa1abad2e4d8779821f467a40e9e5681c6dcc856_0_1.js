function() {
    var key = __stack[1].getFileName();
    if (cfgCache[key] == undefined) {
        var cfgPath = key + ".config";
        if (path.existsSync(cfgPath)) {
            try {
                var buf = fs.readFileSync(cfgPath, "ascii");
                cfgCache[key] = JSON.parse(buf);
            } catch (e) {
                if (e instanceof SyntaxError) { throw e; }
                cfgCache[key] = {};
            }
        } else {
            cfgCache[key] = {};
        }
    }
    return cfgCache[key];
}