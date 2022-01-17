function () {
    var dir = app.root + '/config/locales';
    if (!railway.utils.existsSync(dir)) {
        return false;
    }

    app.locales = app.locales || [];

    exports.load(dir);
}