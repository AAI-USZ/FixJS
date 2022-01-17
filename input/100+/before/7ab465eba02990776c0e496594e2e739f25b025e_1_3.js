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

      commandsset.appendChild(command);
      menupopup.appendChild(menuitem);

      aBreakpoint[aName] = {
        menuitem: menuitem,
        command: command
      };
    }