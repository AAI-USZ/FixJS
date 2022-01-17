function () {
                    CommandManager.register("Brackets Test Command Custom 0", "custom.command0", function () {});
                    var menu = Menus.addMenu("Custom", "menu-custom");
                    var menuItem = menu.addMenuItem("custom.command0", "Ctrl-9");
                    var menuSelector = "#menu-custom-custom\\.command0";
                    
                    // Verify menu is synced with command
                    var $menuItem = testWindow.$(menuSelector),
                        $shortcut = $menuItem.find(".menu-shortcut");
                    
                    // verify key data instead of platform-specific labels
                    if (testWindow.brackets.platform === "win") {
                        expect($shortcut.data("key")).toBe("Ctrl-9");
                    } else if (testWindow.brackets.platform === "mac") {
                        expect($shortcut.data("key")).toBe("Cmd-9");
                    }
                    
                    // change keyboard shortcut
                    KeyBindingManager.addBinding("custom.command0", "Alt-8");
                    
                    // verify updated keyboard shortcut
                    expect($shortcut.data("key")).toBe("Alt-8");
                }