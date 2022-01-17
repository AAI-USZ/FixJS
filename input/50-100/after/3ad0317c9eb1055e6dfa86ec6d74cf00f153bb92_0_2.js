function createMovieObj(filepath, avail, ts) {
    var filename = path.basename(filepath);
    var m = {};
    m['hash'] = getHash(filename);
    m['fullpath'] = filepath;
    m['filename'] = filename;
    m['available'] = avail;
    if (ts && typeof ts === 'number') {
        m['timestamp'] = ts;
    }
    return m;
}