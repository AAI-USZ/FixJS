function () {
        WorkingSetView.create($openFilesContainer);
        
        $(ProjectManager).on("projectRootChanged", _updateProjectTitle);
        
        _initSidebarResizer();
    }