function checkNonJSFiles(dir) {
    var files = fs.readdirSync(dir),
        fullPath;

    files.forEach(function (f) {
        fullPath = path.join(dir, f);
        if (!fs.statSync(fullPath).isDirectory()) {
            if (path.extname(fullPath).toLowerCase() !== ".js") {
                throw localize.translate("EXCEPTION_NON_JS_FILE_IN_API_DIR", fullPath);
            }
        } else {
            checkNonJSFiles(fullPath);
        }
    });
}