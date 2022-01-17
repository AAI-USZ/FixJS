function tryExtensions(path) {
        var filename, exts = Object.keys(extensions);
        for (var i=0; i<exts.length; ++i) {
            filename = tryFile(path + exts[i]);
            if (filename) return filename;
        }
        return null;
    }