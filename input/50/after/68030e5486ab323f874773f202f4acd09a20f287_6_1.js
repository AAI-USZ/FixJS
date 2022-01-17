function _fileFromURL(url) {
        var comp = url.split("/");
        return comp[comp.length - 1];
    }