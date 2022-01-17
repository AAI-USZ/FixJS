function()
    {
        var tooltip = "Firebug " + Firebug.getVersion();
        tooltip += "\n" + this.getEnablementStatus();

        if (Firebug.getSuspended())
        {
            tooltip += "\n" + Locale.$STR("startbutton.tip.deactivated");
        }
        else
        {
            tooltip += "\n" + Locale.$STRP("plural.Total_Firebugs2",
                [Firebug.TabWatcher.contexts.length]);
        }

        if (Firebug.allPagesActivation == "on")
        {
            var label = Locale.$STR("enablement.on");
            tooltip += "\n"+label+" "+Locale.$STR("enablement.for all pages");
        }
        // else allPagesActivation == "none" we don't show it.

        tooltip += "\n" + Locale.$STR(Firebug.getPlacement());

        var firebugStatus = Firefox.getElementById("firebugStatus");
        if (!firebugStatus)
            return;

        firebugStatus.setAttribute("tooltiptext", tooltip);

        // The start button is colorful only if there is a context
        var active = Firebug.currentContext ? "true" : "false";
        firebugStatus.setAttribute("firebugActive", active);

        if (FBTrace.DBG_TOOLTIP)
            FBTrace.sysout("StartButton.resetTooltip; called: firebug active: " + active);
    }