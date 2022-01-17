function () {
        WorkingSetView.create($openFilesContainer);
        
        $(ProjectManager).on("projectRootChanged", _updateProjectTitle);

        CommandManager.register(Strings.CMD_HIDE_SIDEBAR,       Commands.VIEW_HIDE_SIDEBAR,     toggleSidebar);
        
        _initSidebarResizer();
    }