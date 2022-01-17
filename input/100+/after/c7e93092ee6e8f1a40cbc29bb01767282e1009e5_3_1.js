function getModulesArray(dest, files, baseDir) {
    var modulesList = [],
        EXCLUDE_FILES = ["client.js", "manifest.json"];

    function isExcluded(file) {
        return EXCLUDE_FILES.some(function (element) {
            return path.basename(file) === element;
        });
    }

    files.forEach(function (file) {
        file = path.resolve(baseDir, file);

        if (!fs.statSync(file).isDirectory()) {
            if (baseDir !== dest.EXT || !isExcluded(file)) {
                modulesList.push(path.relative(path.normalize(dest.CHROME), file).replace(/\\/g, "/"));
            }
        }
    });

    return modulesList;
}