function _savePreferences() {

        if (_isProjectChanging) {
            return;
        }
        
        // save the working set file paths
        var files       = [],
            isActive    = false,
            workingSet  = getWorkingSet(),
            currentDoc  = getCurrentDocument(),
            projectRoot = ProjectManager.getProjectRoot();

        if (!projectRoot) {
            return;
        }

        workingSet.forEach(function (file, index) {
            // flag the currently active editor
            isActive = currentDoc && (file.fullPath === currentDoc.file.fullPath);

            files.push({
                file: file.fullPath,
                active: isActive
            });
        });

        // append file root to make file list unique for each project
        _prefs.setValue("files_" + projectRoot.fullPath, files);
    }