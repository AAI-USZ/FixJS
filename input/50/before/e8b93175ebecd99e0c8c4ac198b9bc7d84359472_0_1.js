function (event, fileEntry) {
            // Only track documents in the current project
            if (ProjectManager.isWithinProject(fileEntry.fullPath)) {
                var doc = DocumentManager.getOpenDocumentForPath(fileEntry.fullPath);
                self._addListener(doc);
            }
        }