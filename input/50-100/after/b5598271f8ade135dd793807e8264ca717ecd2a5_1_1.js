function setCurrentDocument(doc) {
        
        // If this doc is already current, do nothing
        if (_currentDocument === doc) {
            return;
        }

        var perfTimerName = PerfUtils.markStart("setCurrentDocument:\t" + doc.file.fullPath);
        
        // If file not within project tree, add it to working set right now (don't wait for it to
        // become dirty)
        if (!ProjectManager.isWithinProject(doc.file.fullPath)) {
            addToWorkingSet(doc.file);
        }
        
        // Adjust MRU working set ordering (except while in the middle of a Ctrl+Tab sequence)
        if (!_documentNavPending) {
            _markMostRecent(doc);
        }
        
        // Make it the current document
        _currentDocument = doc;
        $(exports).triggerHandler("currentDocumentChange");
        // (this event triggers EditorManager to actually switch editors in the UI)

        PerfUtils.addMeasurement(perfTimerName);
    }