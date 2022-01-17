function getModulesArray(dest, files, baseDir) {
    var modulesList = [];

    files.forEach(function (file) {
        file = path.resolve(baseDir, file);

        if (!fs.statSync(file).isDirectory()) {
            if (baseDir !== dest.EXT || path.basename(file) !== "client.js") {
                modulesList.push(path.relative(path.normalize(dest.CHROME), file).replace(/\\/g, "/"));
            }
        }
    });

    return modulesList;
}