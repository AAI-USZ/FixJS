function(path) {
    /* XXX ignore errors for inexistent locks? */
    return this._fs.releaseLock(this._path + '/' + path + '.lock');
}