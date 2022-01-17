function _markMostRecent(document) {
        var mruI = findInWorkingSet(document.file.fullPath, _workingSetMRUOrder);
        if (mruI !== -1) {
            _workingSetMRUOrder.splice(mruI, 1);
            _workingSetMRUOrder.unshift(document.file);
        }
    }