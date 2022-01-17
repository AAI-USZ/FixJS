function mkdir(dir, mode) {
    mode = mode || 511; // Octal = 0777;

    var paths = [dir];
    var d = dir;

    while (d != path.dirname(d)) {
        paths.unshift(d);
        d = path.dirname(d);
    }

    for (var i = 0, len = paths.length; i < len; i++) {
        var p = paths[i];
        if (!path.existsSync(p)) {
            fs.mkdirSync(p, mode);
        }
    }
}