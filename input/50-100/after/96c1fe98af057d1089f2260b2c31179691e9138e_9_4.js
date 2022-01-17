function _removeFromWorkingSet(file) {
        // If doc isn't in working set, do nothing
        var index = findInWorkingSet(file.fullPath);
        if (index === -1) {
            return;
        }
        
        // Remove
        _workingSet.splice(index, 1);
        _workingSetMRUOrder.splice(findInWorkingSet(file.fullPath, _workingSetMRUOrder), 1);
        
        // Dispatch event
        $(exports).triggerHandler("workingSetRemove", file);
    }