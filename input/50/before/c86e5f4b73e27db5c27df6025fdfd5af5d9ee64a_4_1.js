function () {
    var dir = app.root + '/config/locales';
    if (!path.existsSync(dir)) {
        return false;
    }

    app.locales = app.locales || [];

    exports.load(dir);
}