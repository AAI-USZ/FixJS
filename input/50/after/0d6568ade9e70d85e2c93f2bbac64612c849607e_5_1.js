function _markMostRecent(doc) {
        var mruI = findInWorkingSet(doc.file.fullPath, _workingSetMRUOrder);
        if (mruI !== -1) {
            _workingSetMRUOrder.splice(mruI, 1);
            _workingSetMRUOrder.unshift(doc.file);
        }
    }