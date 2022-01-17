function createMovieObj(filepath, avail) {
    var filename = path.basename(filepath);
    var m = {};
    m['hash'] = getHash(filename);
    m['fullpath'] = filepath;
    m['filename'] = filename;
    m['available'] = avail;
    m['timestamp'] = (new Date()).getTime();
    return m;
}