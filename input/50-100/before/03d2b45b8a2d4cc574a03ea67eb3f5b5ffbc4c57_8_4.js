function makeAbsolute(paths) {
        var fullPath = testWindow.brackets.test.ProjectManager.getProjectRoot().fullPath;
        
        function prefixProjectPath(path) {
            if (path.indexOf(fullPath) === 0) {
                return path;
            }
            
            return fullPath + path;
        }
        
        if (Array.isArray(paths)) {
            return paths.map(prefixProjectPath);
        } else {
            return prefixProjectPath(paths);
        }
    }