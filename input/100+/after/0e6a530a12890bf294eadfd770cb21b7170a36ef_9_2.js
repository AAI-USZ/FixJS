function()
    {
        var firebugStatus = Firefox.getElementById("firebugStatus");
        if (!firebugStatus)
            return;

        // The start button is colorful only if there is a context
        var active = Firebug.currentContext ? "true" : "false";
        firebugStatus.setAttribute("firebugActive", active);

        if (FBTrace.DBG_TOOLTIP)
            FBTrace.sysout("StartButton.resetTooltip; called: firebug active: " + active);
    }