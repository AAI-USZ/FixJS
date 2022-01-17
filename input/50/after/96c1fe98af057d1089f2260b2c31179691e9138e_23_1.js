function _getDefaultProjectPath() {
        var loadedPath = decodeURI(window.location.pathname);
        var bracketsSrc = loadedPath.substr(0, loadedPath.lastIndexOf("/"));
        
        bracketsSrc = FileUtils.convertToNativePath(bracketsSrc);

        return bracketsSrc;
    }