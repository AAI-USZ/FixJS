function(filepath) {
    if (filepath.indexOf('/') === 0) {
        return filepath;
    }
    
    return __dirname + '/' + filepath;
}