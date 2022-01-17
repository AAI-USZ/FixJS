function findInWorkingSet(fullPath) {
        var ret = -1;
        var found = _workingSet.some(function findByPath(file, i) {
                ret = i;
                return file.fullPath === fullPath;
            });
            
        return (found ? ret : -1);
    }