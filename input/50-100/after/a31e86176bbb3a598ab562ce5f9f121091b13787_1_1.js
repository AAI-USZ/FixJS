function resolvePath (filePath) {
    var parent = new mod.Module('tmp');
    var seachPaths = [path.dirname(state.currentPath)]
        .concat(state.options.searchPaths)
        .concat(mod._nodeModulePaths(state.currentPath));
    var resolvedPath = mod._findPath(filePath, seachPaths);
    if (!resolvedPath) {
        throw new Error('Path ' + filePath + ' not found. Required from ' + state.currentPath);
    }
    return fs.realpathSync(resolvedPath);
}