function findInWorkingSet(fullPath, list) {
        list = list || _workingSet;
        
        var ret = -1;
        var found = list.some(function findByPath(file, i) {
                ret = i;
                return file.fullPath === fullPath;
            });
            
        return (found ? ret : -1);
    }