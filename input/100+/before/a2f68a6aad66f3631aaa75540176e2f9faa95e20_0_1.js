function init($titleContainerToolbar) {
        _$titleContainerToolbar = $titleContainerToolbar;
        _$titleWrapper = $(".title-wrapper", _$titleContainerToolbar);
        _$title = $(".title", _$titleWrapper);

        // Register global commands
        CommandManager.register(Strings.CMD_FILE_OPEN,          Commands.FILE_OPEN, handleFileOpen);
        CommandManager.register(Strings.CMD_ADD_TO_WORKING_SET, Commands.FILE_ADD_TO_WORKING_SET, handleFileAddToWorkingSet);
        // TODO: (issue #274) For now, hook up File > New to the "new in project" handler. Eventually
        // File > New should open a new blank tab, and handleFileNewInProject should
        // be called from a "+" button in the project
        CommandManager.register(Strings.CMD_FILE_NEW,           Commands.FILE_NEW, handleFileNewInProject);
        CommandManager.register(Strings.CMD_FILE_SAVE,          Commands.FILE_SAVE, handleFileSave);

        CommandManager.register(Strings.CMD_FILE_CLOSE,         Commands.FILE_CLOSE, handleFileClose);
        CommandManager.register(Strings.CMD_FILE_CLOSE_ALL,     Commands.FILE_CLOSE_ALL, handleFileCloseAll);
        CommandManager.register(Strings.CMD_CLOSE_WINDOW,       Commands.FILE_CLOSE_WINDOW, handleFileCloseWindow);
        CommandManager.register(Strings.CMD_QUIT,               Commands.FILE_QUIT, handleFileQuit);
        CommandManager.register(Strings.CMD_REFRESH_WINDOW,     Commands.DEBUG_REFRESH_WINDOW, handleFileReload);
        CommandManager.register(Strings.CMD_NEXT_DOC,           Commands.NAVIGATE_NEXT_DOC, handleGoNextDoc);
        CommandManager.register(Strings.CMD_PREV_DOC,           Commands.NAVIGATE_PREV_DOC, handleGoPrevDoc);

        KeyBindingManager.addBinding(Commands.NAVIGATE_NEXT_DOC, [{key: "Ctrl-Tab",   platform: "win"},
                                                                    {key: "Ctrl-Tab",  platform:  "mac"}]);
        KeyBindingManager.addBinding(Commands.NAVIGATE_PREV_DOC, [{key: "Ctrl-Shift-Tab",   platform: "win"},
                                                                    {key: "Ctrl-Shift-Tab",  platform:  "mac"}]);
        
        // Listen for changes that require updating the editor titlebar
        $(DocumentManager).on("dirtyFlagChange", handleDirtyChange);
        $(DocumentManager).on("currentDocumentChange", handleCurrentDocumentChange);
    }