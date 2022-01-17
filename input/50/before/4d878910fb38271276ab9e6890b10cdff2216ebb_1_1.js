function () {
                // Set focus back to the editor when the menu is dismissed. The command
                // may additionally move focus elsewhere.
                EditorManager.focusEditor();
                
                menuItem._command.execute();
            }