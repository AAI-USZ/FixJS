function () {
        var defaults = {
            projectPath:      _getDefaultProjectPath(), /* initialze to brackets source */
            projectTreeState: ""
        };
        
        // Init PreferenceStorage
        _prefs = PreferencesManager.getPreferenceStorage(PREFERENCES_CLIENT_ID, defaults);

        // Event Handlers
        $(FileViewController).on("documentSelectionFocusChange", _documentSelectionFocusChange);
        $("#open-files-container").on("contentChanged", function () {
            _redraw(false); // redraw jstree when working set size changes
        });

        CommandManager.register(Strings.CMD_OPEN_FOLDER,    Commands.FILE_OPEN_FOLDER,  openProject);
    }