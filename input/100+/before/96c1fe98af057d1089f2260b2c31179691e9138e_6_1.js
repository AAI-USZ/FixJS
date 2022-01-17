function init() {
        var cmdToIdMap = {}; // used to swap the values and keys for fast look up

        function createExecFunc(commandStr) {
            return function () {
                // TODO TY: should flash menu here on Mac
                //console.log(commandStr);
                CommandManager.execute(commandStr);
            };
        }

        // create click handlers and populate cmdToIdMap
        var menuID;
        var commandStr;
        for (menuID in menuMap) {
            if (menuMap.hasOwnProperty(menuID)) {
                commandStr = menuMap[menuID];
                $("#" + menuID).click(createExecFunc(commandStr));
                cmdToIdMap[commandStr] = menuID;
            }
        }

        // Add shortcut key text to menu items in UI
        var menuBindings = KeyBindingManager.getKeymap();
        var keyCmd, shortcut;
        for (keyCmd in menuBindings) {
            if (menuBindings.hasOwnProperty(keyCmd)) {
                commandStr = menuBindings[keyCmd];
                menuID = cmdToIdMap[commandStr];
                if (menuID) {
                    // Convert normalized key representation to display appropriate for platform
                    if (brackets.platform === "mac") {
                        shortcut = keyCmd.replace(/-/g, "");        // remove dashes
                        shortcut = shortcut.replace("Ctrl", "&#8984");  // Ctrl > command symbol
                        shortcut = shortcut.replace("Shift", "&#8679"); // Shift > shift symbol
                        shortcut = shortcut.replace("Alt", "&#8997");   // Alt > option symbol
                    } else {
                        shortcut = keyCmd.replace(/-/g, "+");
                    }

                    var $menu = $("#" + menuID);
                    // Some commands have multiple key commands. Only add the first one.
                    if ($menu.find(".menu-shortcut").length === 0) {
                        $menu.append("<span class='menu-shortcut'>" + shortcut + "</span>");
                    }
                }
            }
        }

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

// Other debug menu items
//            $("#menu-debug-wordwrap").click(function() {
//                editor.setOption("lineWrapping", !(editor.getOption("lineWrapping")));
//            });     
        
                
   
    }