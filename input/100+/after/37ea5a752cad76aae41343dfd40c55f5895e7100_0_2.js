function (command, keyBindings, position, relativeID) {
        var id,
            $menuItem,
            $link,
            menuItem,
            name,
            commandID;

        if (!command) {
            throw new Error("addMenuItem(): missing required parameters: command");
        }

        if (typeof (command) === "string") {
            if (command === DIVIDER) {
                name = DIVIDER;
                commandID = _getNextMenuItemDividerID();
            } else {
                commandID = command;
                command = CommandManager.get(commandID);
                if (!command) {
                    throw new Error("addMenuItem(): commandID not found: " + commandID);
                }
                name = command.getName();
            }
        } else {
            commandID = command.getID();
        }

        // Internal id is the a composite of the parent menu id and the command id.
        id = this.id + "-" + commandID;
        
        if (menuItemMap[id]) {
            console.log("MenuItem added with same id of existing MenuItem: " + id);
            return null;
        }

        // create MenuItem
        menuItem = new MenuItem(id, command);
        menuItemMap[id] = menuItem;

        // create MenuItem DOM
        if (name === DIVIDER) {
            $menuItem = $("<li><hr class='divider' /></li>");
        } else {
            // Create the HTML Menu
            $menuItem = $("<li><a href='#' id='" + id + "'> <span class='menu-name'></span></a></li>");

            $menuItem.on("click", function () {
                menuItem._command.execute();
            });
        }

        // Insert menu item
        var $relativeElement = this._getRelativeMenuItem(relativeID, position);
        _insertInList($("li#" + StringUtils.jQueryIdEscape(this.id) + " > ul.dropdown-menu"),
                      $menuItem, position, $relativeElement);

        // Initialize MenuItem state
        if (!menuItem.isDivider) {
            if (keyBindings) {
                // Add key bindings. The MenuItem listens to the Command object to update MenuItem DOM with shortcuts.
                if (!Array.isArray(keyBindings)) {
                    keyBindings = [keyBindings];
                }
                
                // Note that keyBindings passed during MenuItem creation take precedent over any existing key bindings
                KeyBindingManager.addBinding(commandID, keyBindings);
            } else {
                // Look for existing key bindings
                _addExistingKeyBinding(menuItem, commandID);
            }

            menuItem._checkedChanged();
            menuItem._enabledChanged();
            menuItem._nameChanged();
        }

        return menuItem;
    }