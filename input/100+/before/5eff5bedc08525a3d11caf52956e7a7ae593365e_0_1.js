function loadTunnel(name, tunnelDefDir) {
    var local, stat, obj;

    if (existsSync(name)) {
        // Obviously a file name already
        local = name;
    } else if (tunnelDefDir) {
        // Unqualified names should be in the tunnel dir
        local = path.join(tunnelDefDir, name);
    }

    if (!local) {
        throw new Error('Can not find a tunnel file for "' + name + '" (1)');
    }

    if (!name.match(/(\.ini)$/)) {
        // No extension given, find the file
        if (existsSync(local + '.ini')) {
            local = local + '.ini';
        }
    }

    if (!existsSync(local)) {
        throw new Error('Can not find a tunnel file for "' + name + '" (2)');
    }

    if (local.match(/\.ini$/)) {
        obj = loadIniTunnel(local);
        obj.stat = fs.statSync(local);
    } else {
        throw new Error('Unknown format config ' + local);
    }

    validate(obj);
    return obj;
}