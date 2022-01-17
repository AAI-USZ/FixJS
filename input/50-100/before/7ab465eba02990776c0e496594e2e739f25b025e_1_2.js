function DVB__destroyContextMenu(aBreakpoint) {
    let commandsetId = "breakpointMenuCommands-" + aBreakpoint.id;
    let menupopupId = "breakpointContextMenu-" + aBreakpoint.id;

    let commandset = document.getElementById(commandsetId);
    let menupopup = document.getElementById(menupopupId);

    if (commandset) {
      commandset.parentNode.removeChild(commandset);
    }
    if (menupopup) {
      menupopup.parentNode.removeChild(menupopup);
    }
  }