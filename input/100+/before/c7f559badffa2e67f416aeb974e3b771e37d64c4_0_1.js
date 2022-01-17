function files(arg) {
    var stat = fs.statSync(arg),
        files = [],
        ignoreFile = path.join(process.cwd(), '.jscheckstyleignore'),
        ignores = [];

    if (path.existsSync(ignoreFile)) {
        var stream =fs.createReadStream(ignoreFile);
        ignores = fs.readFileSync(ignoreFile, 'utf-8').split('\n').filter(function (line) {
            return !!line;
        });
    }
    
    if (stat.isDirectory()) {
        f.walkSync(arg, function (base, dirs, names) {
            names.forEach(function (name) {
                if (name.match(/.js$/)) {
                    addFile(path.join(base, name), files, ignores);
                }
            });
        });
    } else {
        addFile(arg, files, ignores);
    }
    return files;
}