function resolvePath (filePath) {
    var resolvedPath = mod._findPath(filePath,
        [path.dirname(state.currentPath)].concat(state.options.searchPaths));
    if (!resolvedPath) throw new Error('Path ' + filePath + ' not found.');
    return fs.realpathSync(resolvedPath);
}