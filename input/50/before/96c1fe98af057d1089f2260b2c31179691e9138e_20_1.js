function getNativeBracketsDirectoryPath() {
        var pathname = window.location.pathname;
        var directory = pathname.substr(0, pathname.lastIndexOf("/"));
        return convertToNativePath(directory);
    }