function (fullPath, isDirectory) {
        this.isDirectory = isDirectory;
        this.isFile = !isDirectory;
        
        if (fullPath) {
            // add trailing "/" to directory paths
            if (isDirectory && (fullPath.charAt(fullPath.length - 1) !== "/")) {
                fullPath = fullPath.concat("/");
            }
        }
        
        this.fullPath = fullPath;

        this.name = null; // default if extraction fails
        if (fullPath) {
            var pathParts = fullPath.split("/");
            
            // Extract name from the end of the fullPath (account for trailing slash(es))
            while (!this.name && pathParts.length) {
                this.name = pathParts.pop();
            }
        }

        // TODO (issue #241)
        // http://www.w3.org/TR/2011/WD-file-system-api-20110419/#widl-Entry-filesystem
        this.filesystem = null;
    }