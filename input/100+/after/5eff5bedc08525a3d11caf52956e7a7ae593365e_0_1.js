function loadByName(name, tunnelDefDir) {
    var local = path.join(tunnelDefDir, name) + '.ini';
    return loadFile(local);
}