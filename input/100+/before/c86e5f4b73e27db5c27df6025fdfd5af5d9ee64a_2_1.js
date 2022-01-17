function (root) {
    app.extensions = {};
    var ctx = getNPMFileContext(root);
    var js = 'npmfile.js', coffee = 'npmfile.coffee',
        filename;

    if (path.existsSync(path.join(root, js))) {
        filename = js;
    } else if (path.existsSync(path.join(root, coffee))) {
        filename = coffee;
    }
    if (filename) {
        utils.runCode(path.join(root, filename), ctx);
    }

    initBundledExtensions();
}