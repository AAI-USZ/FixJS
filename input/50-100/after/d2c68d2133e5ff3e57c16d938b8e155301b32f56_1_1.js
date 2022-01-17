function (cachefile) {
    var cache;
    var rawcache;

    if (fs.existsSync(cachefile) === false) {
        return false;
    }

    log.debug('loading cache file %s', cachefile);
    rawcache = fs.readFileSync(cachefile, 'utf8');
    cache = JSON.parse(rawcache);

    return cache;
}