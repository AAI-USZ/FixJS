function addBasePath(basePath, prefix, context, root) {
    prefix = prefix || '';
    if (!railway.utils.existsSync(basePath)) return;

    root = root || app.root;

    Controller.index[root] = Controller.index[root] || {};
    Controller.context[root] = Controller.context[root] || {};

    fs.readdirSync(basePath).forEach(addContoller);

    function addContoller(file) {
        var stat = fs.statSync(path.join(basePath, file));
        if (stat.isFile()) {
            var m = file.match(/(.*?)_?[cC]ontroller\.(js|coffee)$/);
            if (m) {
                var ctl = prefix + m[1];
                Controller.index[root][ctl] = Controller.index[root][ctl] || path.join(basePath, file);
                Controller.context[root][ctl] = Controller.context[root][ctl] || context;
            }
        } else if (stat.isDirectory()) {
            exports.addBasePath(path.join(basePath, file), prefix + file + '/', context, root);
        }
    }
}