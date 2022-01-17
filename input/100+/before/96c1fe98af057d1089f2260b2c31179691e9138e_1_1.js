function initKeyBindings() {
            // Register keymaps and install the keyboard handler
            // TODO: (issue #268) show keyboard equivalents in the menus
            var _globalKeymap = KeyMap.create({
                "bindings": [
                    // FILE
                    {"Ctrl-N": Commands.FILE_NEW},
                    {"Ctrl-O": Commands.FILE_OPEN},
                    {"Ctrl-S": Commands.FILE_SAVE},
                    {"Ctrl-W": Commands.FILE_CLOSE},
                    {"Ctrl-Alt-P": Commands.FILE_LIVE_FILE_PREVIEW},
                    {"Ctrl-Q": Commands.FILE_QUIT},

                    // EDIT 
                    // disabled until the menu items are connected to the commands. Keyboard shortcuts work via CodeMirror
                    //{"Ctrl-Z": Commands.EDIT_UNDO},
                    //{"Ctrl-Y": Commands.EDIT_REDO},
                    //{"Ctrl-X": Commands.EDIT_CUT},
                    //{"Ctrl-C": Commands.EDIT_COPY}, 
                    //{"Ctrl-V": Commands.EDIT_PASTE},

                    {"Ctrl-A": Commands.EDIT_SELECT_ALL},
                    {"Ctrl-F": Commands.EDIT_FIND},
                    {"Ctrl-Shift-F": Commands.EDIT_FIND_IN_FILES},
                    {"Ctrl-G": Commands.EDIT_FIND_NEXT, "platform": "mac"},
                    {"F3": Commands.EDIT_FIND_NEXT, "platform": "win"},
                    {"Ctrl-Shift-G": Commands.EDIT_FIND_PREVIOUS, "platform": "mac"},
                    {"Shift-F3": Commands.EDIT_FIND_PREVIOUS, "platform": "win"},
                    {"Ctrl-Alt-F": Commands.EDIT_REPLACE, "platform": "mac"},
                    {"Ctrl-H": Commands.EDIT_REPLACE, "platform": "win"},
                    {"Ctrl-D": Commands.EDIT_DUPLICATE},
                    {"Ctrl-/": Commands.EDIT_LINE_COMMENT},

                    // VIEW
                    {"Ctrl-Shift-H": Commands.VIEW_HIDE_SIDEBAR},
                    {"Ctrl-=": Commands.VIEW_INCREASE_FONT_SIZE},
                    {"Ctrl--": Commands.VIEW_DECREASE_FONT_SIZE},
                    
                    // Navigate
                    {"Ctrl-Shift-O": Commands.NAVIGATE_QUICK_OPEN},
                    {"Ctrl-T": Commands.NAVIGATE_GOTO_DEFINITION},
                    {"Ctrl-L": Commands.NAVIGATE_GOTO_LINE, "platform": "mac"},
                    {"Ctrl-G": Commands.NAVIGATE_GOTO_LINE, "platform": "win"},
                    {"Ctrl-E": Commands.SHOW_INLINE_EDITOR},
                    {"Alt-Up": Commands.QUICK_EDIT_PREV_MATCH},
                    {"Alt-Down": Commands.QUICK_EDIT_NEXT_MATCH},

                    // DEBUG
                    {"F5": Commands.DEBUG_REFRESH_WINDOW, "platform": "win"},
                    {"Ctrl-R": Commands.DEBUG_REFRESH_WINDOW, "platform": "mac"}


                ],
                "platform": brackets.platform
            });
            KeyBindingManager.installKeymap(_globalKeymap);

            window.document.body.addEventListener(
                "keydown",
                function (event) {
                    if (KeyBindingManager.handleKey(KeyMap.translateKeyboardEvent(event))) {
                        event.stopPropagation();
                    }
                },
                true
            );
        }