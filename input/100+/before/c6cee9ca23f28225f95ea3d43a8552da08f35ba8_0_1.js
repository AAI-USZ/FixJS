function _setWidth(width, updateMenu, displayTriangle) {
        // if we specify a width with the handler call, use that. Otherwise use
        // the greater of the current width or 200 (200 is the minimum width we'd snap back to)
        
        var prefs                   = PreferencesManager.getPreferenceStorage(PREFERENCES_CLIENT_ID, defaultPrefs),
            sidebarWidth            = Math.max(prefs.getValue("sidebarWidth"), 10);
        
        width = width || Math.max($sidebar.width(), sidebarWidth);
        
        if (typeof displayTriangle === "boolean") {
            var display = (displayTriangle) ? "block" : "none";
            $sidebar.find(".triangle-visible").css("display", display);
        }
        
        if (isSidebarClosed) {
            $sidebarResizer.css("left", 0);
        } else {
            $sidebar.width(width);
            $sidebarResizer.css("left", width - 1);
            
            // the following three lines help resize things when the sidebar shows
            // but ultimately these should go into ProjectManager.js with a "notify" 
            // event that we can just call from anywhere instead of hard-coding it.
            // waiting on a ProjectManager refactor to add that. 
            $sidebar.find(".sidebar-selection").width(width);
            
            if (width > 10) {
                prefs.setValue("sidebarWidth", width);
            }
        }
        
        if (updateMenu) {
            var text = (isSidebarClosed) ? Strings.CMD_SHOW_SIDEBAR : Strings.CMD_HIDE_SIDEBAR;
            CommandManager.get(Commands.VIEW_HIDE_SIDEBAR).setName(text);
        }
        EditorManager.resizeEditor();
    }