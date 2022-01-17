function DVB__destroyContextMenu(aBreakpoint) {
    if (!aBreakpoint.commandsetId || !aBreakpoint.menupopupId) {
      return;
    }

    let commandset = document.getElementById(aBreakpoint.commandsetId);
    let menupopup = document.getElementById(aBreakpoint.menupopupId);

    commandset.parentNode.removeChild(commandset);
    menupopup.parentNode.removeChild(menupopup);
  }