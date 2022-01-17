function DVB_createContextMenu(aBreakpoint) {
    let commandsetId = "breakpointMenuCommands-" + aBreakpoint.id;
    let menupopupId = "breakpointContextMenu-" + aBreakpoint.id;

    let commandset = document.createElement("commandset");
    commandset.setAttribute("id", commandsetId);

    let menupopup = document.createElement("menupopup");
    menupopup.setAttribute("id", menupopupId);

    /**
     * Creates a menu item specified by a name with the appropriate attributes
     * (label and command handler).
     *
     * @param string aName
     *        A global identifier for the menu item.
     * @param boolean aHiddenFlag
     *        True if this menuitem should be hidden.
     */
    function createMenuItem(aName, aHiddenFlag) {
      let menuitem = document.createElement("menuitem");
      let command = document.createElement("command");

      let func = this["_on" + aName.charAt(0).toUpperCase() + aName.slice(1)];
      let label = L10N.getStr("breakpointMenuItem." + aName);

      let prefix = "bp-cMenu-";
      let commandId = prefix + aName + "-" + aBreakpoint.id + "-command";
      let menuitemId = prefix + aName + "-" + aBreakpoint.id + "-menuitem";

      command.setAttribute("id", commandId);
      command.setAttribute("label", label);
      command.addEventListener("command", func.bind(this, aBreakpoint), true);

      menuitem.setAttribute("id", menuitemId);
      menuitem.setAttribute("command", commandId);
      menuitem.setAttribute("hidden", aHiddenFlag);

      commandset.appendChild(command);
      menupopup.appendChild(menuitem);

      aBreakpoint[aName] = {
        menuitem: menuitem,
        command: command
      };
    }

    /**
     * Creates a simple menu separator element and appends it to the current
     * menupopup hierarchy.
     */
    function createMenuSeparator() {
      let menuseparator = document.createElement("menuseparator");
      menupopup.appendChild(menuseparator);
    }

    createMenuItem.call(this, "enableSelf", true);
    createMenuItem.call(this, "disableSelf");
    createMenuItem.call(this, "deleteSelf");
    createMenuSeparator();
    createMenuItem.call(this, "enableOthers");
    createMenuItem.call(this, "disableOthers");
    createMenuItem.call(this, "deleteOthers");
    createMenuSeparator();
    createMenuItem.call(this, "enableAll");
    createMenuItem.call(this, "disableAll");
    createMenuSeparator();
    createMenuItem.call(this, "deleteAll");

    let popupset = document.getElementById("debugger-popups");
    popupset.appendChild(menupopup);
    document.documentElement.appendChild(commandset);

    aBreakpoint.commandsetId = commandsetId;
    aBreakpoint.menupopupId = menupopupId;

    return menupopupId;
  }