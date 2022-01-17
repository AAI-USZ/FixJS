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
                                                             {key: "Cmd-G", platform: "mac"}]);

        menu.addMenuItem(Commands.EDIT_FIND_PREVIOUS,       [{key: "Shift-F3",      platform: "win"},
                                                             {key:  "Cmd-Shift-G", platform: "mac"}]);

        menu.addMenuDivider();
        menu.addMenuItem(Commands.EDIT_REPLACE,             [{key: "Ctrl-H",     platform: "win"},
                                                             {key: "Cmd-Alt-F", platform: "mac"}]);
        menu.addMenuDivider();
        menu.addMenuItem(Commands.EDIT_INDENT,          [{key: "Indent", displayKey: "Tab"}]);
        menu.addMenuItem(Commands.EDIT_UNINDENT,        [{key: "Unindent", displayKey: "Shift-Tab"}]);
        menu.addMenuItem(Commands.EDIT_DUPLICATE,       "Ctrl-D");
        menu.addMenuItem(Commands.EDIT_LINE_COMMENT,    "Ctrl-/");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.TOGGLE_USE_TAB_CHARS);

        /*
         * View menu
         */
        menu = addMenu(Strings.VIEW_MENU, AppMenuBar.VIEW_MENU);
        menu.addMenuItem(Commands.VIEW_HIDE_SIDEBAR,        "Ctrl-Shift-H");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.VIEW_INCREASE_FONT_SIZE, [{key: "Ctrl-=", displayKey: "Ctrl-+"}]);
        menu.addMenuItem(Commands.VIEW_DECREASE_FONT_SIZE, [{key: "Ctrl--", displayKey: "Ctrl-\u2212"}]);
        menu.addMenuItem(Commands.VIEW_RESTORE_FONT_SIZE, "Ctrl-0");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.TOGGLE_JSLINT);

        /*
         * Navigate menu
         */
        menu = addMenu(Strings.NAVIGATE_MENU, AppMenuBar.NAVIGATE_MENU);
        menu.addMenuItem(Commands.NAVIGATE_QUICK_OPEN,      "Ctrl-Shift-O");
        menu.addMenuItem(Commands.NAVIGATE_GOTO_LINE,       [{key: "Ctrl-G", platform: "win"},
                                                             {key: "Cmd-L", platform: "mac"}]);

        menu.addMenuItem(Commands.NAVIGATE_GOTO_DEFINITION, "Ctrl-T");
        menu.addMenuDivider();
        menu.addMenuItem(Commands.TOGGLE_QUICK_EDIT,        "Ctrl-E");
        menu.addMenuItem(Commands.QUICK_EDIT_PREV_MATCH,    {key: "Alt-Up", displayKey: "Alt-\u2191"});
        menu.addMenuItem(Commands.QUICK_EDIT_NEXT_MATCH,    {key: "Alt-Down", displayKey: "Alt-\u2193"});

        /*
         * Debug menu
         */
        menu = addMenu(Strings.DEBUG_MENU, AppMenuBar.DEBUG_MENU);
        menu.addMenuItem(Commands.DEBUG_SHOW_DEVELOPER_TOOLS, [{key: "F12",        platform: "win"},
                                                               {key: "Cmd-Opt-I", platform: "mac"}]);
        menu.addMenuItem(Commands.DEBUG_REFRESH_WINDOW, [{key: "F5",     platform: "win"},
                                                         {key: "Cmd-R", platform:  "mac"}]);
        menu.addMenuItem(Commands.DEBUG_NEW_BRACKETS_WINDOW);
        menu.addMenuDivider();
        menu.addMenuItem(Commands.DEBUG_RUN_UNIT_TESTS);
        menu.addMenuItem(Commands.DEBUG_SHOW_PERF_DATA);


        /*
         * Context Menus
         */
        var project_cmenu = registerContextMenu(ContextMenuIds.PROJECT_MENU);
        project_cmenu.addMenuItem(Commands.FILE_NEW);

        var editor_cmenu = registerContextMenu(ContextMenuIds.EDITOR_MENU);
        editor_cmenu.addMenuItem(Commands.TOGGLE_QUICK_EDIT);
        editor_cmenu.addMenuItem(Commands.EDIT_SELECT_ALL);

        var inline_editor_cmenu = registerContextMenu(ContextMenuIds.INLINE_EDITOR_MENU);
        inline_editor_cmenu.addMenuItem(Commands.TOGGLE_QUICK_EDIT);
        inline_editor_cmenu.addMenuItem(Commands.EDIT_SELECT_ALL);
        inline_editor_cmenu.addMenuDivider();
        inline_editor_cmenu.addMenuItem(Commands.QUICK_EDIT_PREV_MATCH);
        inline_editor_cmenu.addMenuItem(Commands.QUICK_EDIT_NEXT_MATCH);

        /**
         * Context menu for code editors (both full-size and inline)
         * Auto selects the word the user clicks if the click does not occur over
         * an existing selection
         */
        $("#editor-holder").on("contextmenu", function (e) {
            if ($(e.target).parents(".CodeMirror-gutter").length !== 0) {
                return;
            }
            
            // Note: on mousedown before this event, CodeMirror automatically checks mouse pos, and
            // if not clicking on a selection moves the cursor to click location. When triggered
            // from keyboard, no pre-processing occurs and the cursor/selection is left as is.
            
            var editor = EditorManager.getFocusedEditor(),
                inlineWidget = EditorManager.getFocusedInlineWidget();
            
            if (editor) {
                // If there's just an insertion point select the word token at the cursor pos so
                // it's more clear what the context menu applies to.
                if (!editor.hasSelection()) {
                    editor.selectWordAt(editor.getCursorPos());
                    
                    // Prevent menu from overlapping text by moving it down a little
                    // Temporarily backout this change for now to help mitigate issue #1111,
                    // which only happens if mouse is not over context menu. Better fix
                    // requires change to bootstrap, which is too risky for now.
                    //e.pageY += 6;
                }
                
                if (inlineWidget) {
                    inline_editor_cmenu.open(e);
                } else {
                    editor_cmenu.open(e);
                }
            }
        });

        /**
         * Context menu for folder tree & working set list
         *
         * TODO (#1069): change selection on right mousedown if not on something already selected
         */
        $("#projects").on("contextmenu", function (e) {
            project_cmenu.open(e);
        });

        // Prevent the browser context menu since Brackets creates a custom context menu
        $(window).contextmenu(function (e) {
            e.preventDefault();
        });
        
        /*
         * General menu event processing
         */
        // Prevent clicks on top level menus and menu items from taking focus
        $(window.document).on("mousedown", ".dropdown", function (e) {
            e.preventDefault();
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