function init() {

        /*
         * File menu
         */
        var menu;
        menu = addMenu(Strings.FILE_MENU, AppMenuBar.FILE_MENU);
        menu.addMenuItem(Commands.FILE_NEW,                 "Ctrl-N");
        menu.addMenuItem(Commands.FILE_OPEN,                "Ctrl-O");
        menu.addMenuItem(Commands.FILE_OPEN_FOLDER);
        menu.addMenuItem(Commands.FILE_CLOSE,               "Ctrl-W");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.FILE_SAVE,                "Ctrl-S");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.FILE_LIVE_FILE_PREVIEW,   "Ctrl-Alt-P");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.FILE_QUIT,                "Ctrl-Q");

        /*
         * Edit  menu
         */
        menu = addMenu(Strings.EDIT_MENU, AppMenuBar.EDIT_MENU);
        menu.addMenuItem(Commands.EDIT_SELECT_ALL,          "Ctrl-A");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.EDIT_FIND,                "Ctrl-F");
        menu.addMenuItem(Commands.EDIT_FIND_IN_FILES,       "Ctrl-Shift-F");
        menu.addMenuItem(Commands.EDIT_FIND_NEXT,           [{key: "F3",     platform: "win"},
                                                             {key: "Ctrl-G", platform: "mac"}]);

        menu.addMenuItem(Commands.EDIT_FIND_PREVIOUS,       [{key: "Shift-F3",      platform: "win"},
                                                             {key:  "Ctrl-Shift-G", platform: "mac"}]);

        menu.addMenuDivider();
        menu.addMenuItem(Commands.EDIT_REPLACE,             [{key: "Ctrl-H",     platform: "win"},
                                                             {key: "Ctrl-Alt-F", platform: "mac"}]);
        menu.addMenuDivider();
        menu.addMenuItem(Commands.EDIT_DUPLICATE,           "Ctrl-D");
        menu.addMenuItem(Commands.EDIT_LINE_COMMENT,        "Ctrl-/");

        /*
         * View menu
         */
        menu = addMenu(Strings.VIEW_MENU, AppMenuBar.VIEW_MENU);
        menu.addMenuItem(Commands.VIEW_HIDE_SIDEBAR,        "Ctrl-Shift-H");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.VIEW_INCREASE_FONT_SIZE, [{key: "Ctrl-=", displayKey: "Ctrl-+"}]);
        menu.addMenuItem(Commands.VIEW_DECREASE_FONT_SIZE, [{key: "Ctrl--", displayKey: "Ctrl-\u2212"}]);
        menu.addMenuItem(Commands.VIEW_RESTORE_FONT_SIZE, "Ctrl-0");

        /*
         * Navigate menu
         */
        menu = addMenu(Strings.NAVIGATE_MENU, AppMenuBar.NAVIGATE_MENU);
        menu.addMenuItem(Commands.NAVIGATE_QUICK_OPEN,      "Ctrl-Shift-O");
        menu.addMenuItem(Commands.NAVIGATE_GOTO_LINE,       [{key: "Ctrl-G", platform: "win"},
                                                             {key: "Ctrl-L", platform: "mac"}]);

        menu.addMenuItem(Commands.NAVIGATE_GOTO_DEFINITION, "Ctrl-T");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.SHOW_INLINE_EDITOR,       "Ctrl-E");
        menu.addMenuItem(Commands.QUICK_EDIT_PREV_MATCH,    {key: "Alt-Up", displayKey: "Alt-\u2191"});
        menu.addMenuItem(Commands.QUICK_EDIT_NEXT_MATCH,    {key: "Alt-Down", displayKey: "Alt-\u2193"});

        /*
         * Debug menu
         */
        menu = addMenu(Strings.DEBUG_MENU, AppMenuBar.DEBUG_MENU);
        menu.addMenuItem(Commands.DEBUG_REFRESH_WINDOW, [{key: "F5",     platform: "win"},
                                                         {key: "Ctrl-R", platform:  "mac"}]);

        menu.addMenuItem(Commands.DEBUG_SHOW_DEVELOPER_TOOLS, [{key: "F12",        platform: "win"},
                                                               {key: "Ctrl-Opt-I", platform: "mac"}]);
        menu.addMenuItem(Commands.DEBUG_RUN_UNIT_TESTS);
        menu.addMenuItem(Commands.DEBUG_JSLINT);
        menu.addMenuItem(Commands.DEBUG_SHOW_PERF_DATA);
		
        menu.addMenuDivider();
        menu.addMenuItem(Commands.DEBUG_EXPERIMENTAL);
        menu.addMenuItem(Commands.DEBUG_NEW_BRACKETS_WINDOW);
        menu.addMenuItem(Commands.DEBUG_CLOSE_ALL_LIVE_BROWSERS);
        menu.addMenuItem(Commands.DEBUG_USE_TAB_CHARS);


        /*
         * Context Menus
         */
        var project_cmenu = registerContextMenu(ContextMenuIds.PROJECT_MENU);

        var editor_cmenu = registerContextMenu(ContextMenuIds.EDITOR_MENU);
        editor_cmenu.addMenuItem(Commands.SHOW_INLINE_EDITOR);
        editor_cmenu.addMenuItem(Commands.EDIT_SELECT_ALL);

        /**
         * Displays context menu when right clicking editor.
         * Auto selects the word the user clicks if the click does not occur over
         * an existing selection
         *
         * TODO: doesn't word select when changing editors with right click
         *
         */
        $("#editor-holder").contextmenu(function (e) {
            if (e.which === 3) {
                if ($(e.target).parents(".CodeMirror-gutter").length !== 0) {
                    return;
                }

                var editor = EditorManager.getFocusedEditor();
                if (editor) {
                    var clickedSel = false,
                        pos = editor.coordsChar({x: e.pageX, y: e.pageY});
                    if (editor.getSelectedText() !== "") {
                        var sel = editor.getSelection();
                        clickedSel =  editor.coordsWithinRange(pos, sel.start, sel.end);
                    }

                    if (!clickedSel) {
                        editor.selectWordAt(pos);
                        // Prevent menu from overlapping text by
                        // moving it down a little
                        e.pageY += 6;
                    }
                    editor_cmenu.open(e);
                }
            }
        });


        $("#projects").contextmenu(function (e) {
            if (e.which === 3) {
                project_cmenu.open(e);
            }
        });

        // Prevent the browser context menu since Brackets creates a custom context menu
        $(window).contextmenu(function (e) {
            e.preventDefault();
        });

        // Prevent clicks on the top-level menu bar from taking focus
        // Note, bootstrap handles this already for the menu drop downs
        $(window.document).on("mousedown", ".dropdown", function (e) {
            e.preventDefault();
        });

        // close all dropdowns on ESC
        $(window.document).on("keydown", function (e) {
            if (e.keyCode === 27) {
                $(".dropdown").removeClass("open");
            }
        });

        // Switch menus when the mouse enters an adjacent menu
        // Only open the menu if another one has already been opened
        // by clicking
        $(window.document).on("mouseenter", "#main-toolbar .dropdown", function (e) {
            var open = $(this).siblings(".open");
            if (open.length > 0) {
                open.removeClass("open");
                $(this).addClass("open");
            }
        });
    }