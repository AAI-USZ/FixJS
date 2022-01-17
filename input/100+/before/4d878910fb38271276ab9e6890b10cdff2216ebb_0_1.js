function _initTest() {
        // TODO: (issue #265) Make sure the "test" object is not included in final builds
        // All modules that need to be tested from the context of the application
        // must to be added to this object. The unit tests cannot just pull
        // in the modules since they would run in context of the unit test window,
        // and would not have access to the app html/css.
        brackets.test = {
            PreferencesManager      : require("preferences/PreferencesManager"),
            ProjectManager          : ProjectManager,
            DocumentCommandHandlers : DocumentCommandHandlers,
            FileViewController      : FileViewController,
            DocumentManager         : DocumentManager,
            EditorManager           : EditorManager,
            Commands                : Commands,
            WorkingSetView          : WorkingSetView,
            JSLintUtils             : JSLintUtils,
            PerfUtils               : PerfUtils,
            JSUtils                 : JSUtils,
            CommandManager          : require("command/CommandManager"),
            FileSyncManager         : FileSyncManager,
            FileIndexManager        : FileIndexManager,
            Menus                   : Menus,
            KeyBindingManager       : KeyBindingManager,
            CSSUtils                : require("language/CSSUtils"),
            LiveDevelopment         : require("LiveDevelopment/LiveDevelopment"),
            Inspector               : require("LiveDevelopment/Inspector/Inspector"),
            NativeApp               : require("utils/NativeApp"),
            ExtensionUtils          : require("utils/ExtensionUtils"),
            doneLoading             : false
        };

        brackets.ready(function () {
            brackets.test.doneLoading = true;
        });
    }