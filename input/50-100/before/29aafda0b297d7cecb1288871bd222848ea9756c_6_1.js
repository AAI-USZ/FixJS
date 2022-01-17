function(context)
    {
        var panel = Firebug.chrome.getSelectedPanel();
        if (panel && panel.name == "console")
            return;

        if (FBTrace.DBG_COMMANDLINE)
            FBTrace.sysout("commandLine.Popup.toggle;");

        var newState = !this.isVisible();
        Firebug.chrome.setGlobalAttribute("cmd_toggleCommandPopup", "checked", newState);
        Firebug.Options.set("alwaysShowCommandLine", newState);

        this.updateVisibility(newState);

        this.reattach(context);
        this.showPopupPanel(context);
    }