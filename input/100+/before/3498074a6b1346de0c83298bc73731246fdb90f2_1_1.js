function (id, command, keyBindings, position, relativeID) {
        var $menuItem,
            menuItem;

        if (!id || !command) {
            throw new Error("addMenuItem(): missing required parameters. id: " + id);
        }

        if (menuItemMap[id]) {
            throw new Error("MenuItem added with same id of existing MenuItem: " + id);
        }

        var name, commandID;
        if (typeof (command) === "string") {
            if (command === "---") {
                name = "---";
            } else {
                commandID = command;
                command = CommandManager.get(commandID);
                if (!command) {
                    throw new Error("addMenuItem(): commandID not found: " + commandID);
                }
                name = command.getName();
            }
        }

        if (name === "---") {
            $menuItem = $("<li><hr class='divider'></li>");
        } else {
            // Create the HTML Menu
            $menuItem = $("<li><a href='#' id='" + id + "'> <span class='menu-name'>" + StringUtils.htmlEscape(name) + "</span></a></li>");

            // Add key bindings
            if (keyBindings) {
                if (!$.isArray(keyBindings)) {
                    keyBindings = [{key: keyBindings}];
                }

                var key, i, platform;
                for (i = 0; i < keyBindings.length; i++) {
                    key = keyBindings[i].key;
                    platform = keyBindings[i].platform;

                    // TODO: handle insertion position as specified by relativeID, position
                    // also support inserting into Menu Sections

                    // TODO: shortcut needs to update dynamically when keybinding changes

                    if ($menuItem.find(".menu-shortcut").length === 0) {
                        $menuItem.find("a").append("<span class='menu-shortcut'>" + formatKeyCommand(key) + "</span>");
                    }

                    KeyBindingManager.addBinding(command.getID(), key, platform);
                }
            }

            $menuItem.on("click", function () {
                menuItem._command.execute();
            });
        }
        $("#main-toolbar #" + this.id + " .dropdown-menu").append($menuItem);

        menuItem = new MenuItem(id, command);
        menuItemMap[id] = menuItem;

        return menuItem;
    }