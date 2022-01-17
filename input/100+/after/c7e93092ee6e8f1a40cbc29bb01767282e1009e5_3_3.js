function copyExtension(session, target, featureId, extBasename) {
    var extPath = session.conf.EXT,
        apiDir = path.normalize(path.resolve(extPath, extBasename)),
        extDest = session.sourcePaths.EXT,
        soDest = session.sourcePaths.JNEXT_PLUGINS,
        soPath = path.normalize(path.join(apiDir, target)),
        jsFiles,
        soFiles;

    if (path.existsSync(apiDir)) {
        //verify mandatory api files exist
        checkAPIFolder(apiDir);

        //create output folders
        wrench.mkdirSyncRecursive(path.join(extDest, featureId), "0755");
        wrench.mkdirSyncRecursive(soDest, "0755");

        //find all .js and .json files
        jsFiles = packager_utils.listFiles(apiDir, function (file) {
            return hasValidExtension(file);
        });

        //Copy each .js file to its extensions folder
        jsFiles.forEach(function (jsFile) {
            packager_utils.copyFile(jsFile, path.join(extDest, featureId), apiDir);
        });

        if (path.existsSync(soPath)) {
            //find all .so files
            soFiles = packager_utils.listFiles(soPath, function (file) {
                return path.extname(file) === ".so";
            });

            //Copy each .so file to the extensions folder
            soFiles.forEach(function (soFile) {
                packager_utils.copyFile(soFile, soDest);
            });
        }
    }
}