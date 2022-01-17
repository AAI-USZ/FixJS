function init() {

        /*
         * File menu
         */
        var menu;
        menu = addMenu(Strings.FILE_MENU, AppMenuBar.FILE_MENU);
        menu.addMenuItem("menu-file-new",                Commands.FILE_NEW,         "Ctrl-N");
        menu.addMenuItem("menu-file-open",               Commands.FILE_OPEN,        "Ctrl-O");
        menu.addMenuItem("menu-file-open-folder",        Commands.FILE_OPEN_FOLDER);
        menu.addMenuItem("menu-file-close",              Commands.FILE_CLOSE,       "Ctrl-W");
        menu.addMenuDivider();
        menu.addMenuItem("menu-file-save",               Commands.FILE_SAVE,        "Ctrl-S");
        menu.addMenuDivider();
        menu.addMenuItem("menu-file-live-preview",       Commands.FILE_LIVE_FILE_PREVIEW,
                                                                                                    "Ctrl-Alt-P");
        menu.addMenuDivider();
        menu.addMenuItem("menu-file-quit",               Commands.FILE_QUIT,        "Ctrl-Q");

        /*
         * Edit  menu
         */
        menu = addMenu(Strings.EDIT_MENU, AppMenuBar.EDIT_MENU);
        menu.addMenuItem("menu-edit-select-all",         Commands.EDIT_SELECT_ALL,   "Ctrl-A");
        menu.addMenuDivider();
        menu.addMenuItem("menu-edit-find",               Commands.EDIT_FIND,         "Ctrl-F");
        menu.addMenuItem("menu-edit-find-in-files",      Commands.EDIT_FIND_IN_FILES,
                                                                                                     "Ctrl-Shift-F");
        menu.addMenuItem("menu-edit-find-next",          Commands.EDIT_FIND_NEXT,
                                                                            [{key: "F3",     platform: "win"},
                                                                             {key: "Ctrl-G", platform: "mac"}]);

        menu.addMenuItem("menu-edit-find-previous",      Commands.EDIT_FIND_PREVIOUS,
                                                                            [{key: "Shift-F3",      platform: "win"},
                                                                             {key:  "Ctrl-Shift-G", platform: "mac"}]);

        menu.addMenuDivider();
        menu.addMenuItem("menu-edit-replace",             Commands.EDIT_REPLACE,
                                                                            [{key: "Ctrl-H",     platform: "win"},
                                                                             {key: "Ctrl-Alt-F", platform: "mac"}]);
        menu.addMenuDivider();
        menu.addMenuItem("menu-edit-duplicate",          Commands.EDIT_DUPLICATE);
        menu.addMenuItem("menu-edit-comment",            Commands.EDIT_LINE_COMMENT, "Ctrl-/");

        /*
         * View menu
         */
        menu = addMenu(Strings.VIEW_MENU, AppMenuBar.VIEW_MENU);
        menu.addMenuItem("menu-view-sidebar",            Commands.VIEW_HIDE_SIDEBAR, "Ctrl-Shift-H");
        menu.addMenuDivider();
        menu.addMenuItem("menu-view-increase-font",      Commands.VIEW_INCREASE_FONT_SIZE, "Ctrl-=");
        menu.addMenuItem("menu-view-decrease-font",      Commands.VIEW_DECREASE_FONT_SIZE, "Ctrl--");

        /*
         * Navigate menu
         */
        menu = addMenu(Strings.NAVIGATE_MENU, AppMenuBar.NAVIGATE_MENU);
        menu.addMenuItem("menu-navigate-quick-open",  Commands.NAVIGATE_QUICK_OPEN,
                                                                                                        "Ctrl-Shift-O");
        menu.addMenuItem("menu-navigate-goto-line",   Commands.NAVIGATE_GOTO_LINE,
                                                                            [{key: "Ctrl-G", platform: "win"},
                                                                             {key: "Ctrl-L", platform: "mac"}]);

        menu.addMenuItem("menu-navigate-goto-symbol", Commands.NAVIGATE_GOTO_DEFINITION,
                                                                                                        "Ctrl-T");
        menu.addMenuDivider();
        menu.addMenuItem("menu-navigate-quick-edit",  Commands.SHOW_INLINE_EDITOR,
                                                                                                        "Ctrl-E");
        menu.addMenuItem("menu-navigate-prev-match",  Commands.QUICK_EDIT_PREV_MATCH,
                                                                                                        "Alt-Up");
        menu.addMenuItem("menu-navigate-next-match",  Commands.QUICK_EDIT_NEXT_MATCH,
                                                                                                        "Alt-Down");
        /*
         * Debug menu
         */
        menu = addMenu(Strings.DEBUG_MENU, AppMenuBar.DEBUG_MENU);
        menu.addMenuItem("menu-debug-reload-wn",      Commands.DEBUG_REFRESH_WINDOW,
                                                                            [{key: "F5",     platform: "win"},
                                                                             {key: "Ctrl-R", platform:  "mac"}]);

        menu.addMenuItem("menu-debug-dev-tools",      Commands.DEBUG_SHOW_DEVELOPER_TOOLS);
        menu.addMenuItem("menu-debug-run-tests",      Commands.DEBUG_RUN_UNIT_TESTS);
        menu.addMenuItem("menu-debug-enable-jslint",  Commands.DEBUG_JSLINT);
        menu.addMenuItem("menu-debug-perf-data",      Commands.DEBUG_SHOW_PERF_DATA);
        menu.addMenuDivider();
        menu.addMenuItem("menu-debug-experiemental",  Commands.DEBUG_EXPERIMENTAL);
        menu.addMenuItem("menu-debug-new-window",     Commands.DEBUG_NEW_BRACKETS_WINDOW);
        menu.addMenuItem("menu-debug-close-browser",  Commands.DEBUG_CLOSE_ALL_LIVE_BROWSERS);
        menu.addMenuItem("menu-debug-use-tab-chars",  Commands.DEBUG_USE_TAB_CHARS);

        $("#main-toolbar .dropdown")
            // Prevent clicks on the top-level menu bar from taking focus
            // Note, bootstrap handles this already for the menu drop downs 
            .mousedown(function (e) {
                e.preventDefault();
            })
            // Switch menus when the mouse enters an adjacent menu
            // Only open the menu if another one has already been opened
            // by clicking
            .mouseenter(function (e) {
                var open = $(this).siblings(".open");
                if (open.length > 0) {
                    open.removeClass("open");
                    $(this).addClass("open");
                }
            });
    }