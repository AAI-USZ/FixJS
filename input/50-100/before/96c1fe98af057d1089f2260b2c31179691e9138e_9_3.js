function addToWorkingSet(file) {
        // If doc is already in working set, don't add it again
        if (findInWorkingSet(file.fullPath) !== -1) {
            return;
        }
        
        // Add
        _workingSet.push(file);
        
        // Dispatch event
        $(exports).triggerHandler("workingSetAdd", file);
    }