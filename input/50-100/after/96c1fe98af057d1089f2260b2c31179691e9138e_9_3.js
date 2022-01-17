function addToWorkingSet(file) {
        // If doc is already in working set, don't add it again
        if (findInWorkingSet(file.fullPath) !== -1) {
            return;
        }
        
        // Add
        _workingSet.push(file);
        
        // Add to MRU order: either first or last, depending on whether it's already the current doc or not
        if (_currentDocument && _currentDocument.file.fullPath === file.fullPath) {
            _workingSetMRUOrder.unshift(file);
        } else {
            _workingSetMRUOrder.push(file);
        }
        
        // Dispatch event
        $(exports).triggerHandler("workingSetAdd", file);
    }