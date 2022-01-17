function setCurrentDocument(document) {
        
        // If this doc is already current, do nothing
        if (_currentDocument === document) {
            return;
        }

        var perfTimerName = PerfUtils.markStart("setCurrentDocument:\t" + (!document || document.file.fullPath));
        
        // If file not within project tree, add it to working set right now (don't wait for it to
        // become dirty)
        if (!ProjectManager.isWithinProject(document.file.fullPath)) {
            addToWorkingSet(document.file);
        }
        
        // Make it the current document
        _currentDocument = document;
        $(exports).triggerHandler("currentDocumentChange");
        // (this event triggers EditorManager to actually switch editors in the UI)

        PerfUtils.addMeasurement(perfTimerName);
    }