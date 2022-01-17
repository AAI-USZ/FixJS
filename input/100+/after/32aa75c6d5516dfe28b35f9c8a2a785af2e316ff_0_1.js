function isRelative(loc) {
    if (process.platform === 'win32') {
        return loc[0] !== '\\' && loc.match(/^[a-zA-Z]:\\/) == null;
    } else {
        return loc[0] !== '/';
    }
}