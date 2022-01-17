function (sourcefile) {
    // config only supports comments starting with '#',
    // whitspace then a '#', or empty lines
    // '#' characters in the URL are not supported either
    var i;
    var line;
    var lines;
    var results = [];
    var sources;

    if (path.existsSync(sourcefile) === false) {
        return false;
    }

    log.debug('using sources file %s', sourcefile);
    sources = fs.readFileSync(sourcefile, 'utf8');
    lines = sources.split(/\n/);

    for (i = 0; i < lines.length; i++) {
        line = lines[i];
        if (line.match(/^\s*[$#]/) || line === '') {
            continue;
        }
        if (_isUrl(line)) {
            results.push(line);
        }
    }

    return results;
}