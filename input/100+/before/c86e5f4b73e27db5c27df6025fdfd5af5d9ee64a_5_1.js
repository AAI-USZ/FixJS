function (modelsDir) {
    var ctx = {};

    Object.keys(app.models).forEach(function (model) {
        ctx[model] = app.models[model];
        if (ctx[model]._validations) delete ctx[model]._validations;
    });

    if (path.existsSync(modelsDir)) {
        fs.readdirSync(modelsDir).forEach(function (file) {
            if (file.match(/^[^\.].*?\.(js|coffee)$/)) {
                var filename = path.join(modelsDir, file);
                delete Module._cache[filename];
                var m = require(filename);
                if (m && (m.name || m.modelName)) {
                    var name = m.modelName || m.name;
                    app.models[name] = m;
                    global[name] = m;
                }
            }
        });
    }

}