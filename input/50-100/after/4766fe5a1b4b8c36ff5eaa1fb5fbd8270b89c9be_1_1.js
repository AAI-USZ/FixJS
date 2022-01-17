function () {
        var defaults = {
            projectPath:      _getDefaultProjectPath()  /* initialize to brackets source */
        };

        // Init PreferenceStorage
        _prefs = PreferencesManager.getPreferenceStorage(PREFERENCES_CLIENT_ID, defaults);

        // Event Handlers
        $(FileViewController).on("documentSelectionFocusChange", _documentSelectionFocusChange);
        $(FileViewController).on("fileViewFocusChange", _fileViewFocusChange);
        $("#open-files-container").on("contentChanged", function () {
            _redraw(false); // redraw jstree when working set size changes
        });

        CommandManager.register(Strings.CMD_OPEN_FOLDER,    Commands.FILE_OPEN_FOLDER,  openProject);
    }