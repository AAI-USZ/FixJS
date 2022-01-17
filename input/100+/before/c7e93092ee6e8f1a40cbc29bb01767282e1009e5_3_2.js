function generateFrameworkModulesJS(session) {
    var dest = session.sourcePaths,
        modulesList = [],
        modulesStr = "var frameworkModules = ",
        libFiles = wrench.readdirSyncRecursive(dest.LIB),
        extFiles,
        extModules;

    modulesList = modulesList.concat(getModulesArray(dest, libFiles, dest.LIB));

    if (path.existsSync(dest.EXT)) {
        extFiles = wrench.readdirSyncRecursive(dest.EXT);
        extModules = getModulesArray(dest, extFiles, dest.EXT);
        modulesList = modulesList.concat(extModules);
    }

    modulesStr += JSON.stringify(modulesList) + ";";
    fs.writeFileSync(path.normalize(dest.CHROME + "/frameworkModules.js"), modulesStr);
}