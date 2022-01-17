function()
    {
        var firebugStatus = Firefox.getElementById("firebugStatus");

        if (!firebugStatus)
            return;

        var panels = Firebug.getActivablePanelTypes();
        var statuses = [];
        var status = "";

        var strOn = Locale.$STR("enablement.on");
        var strOff = Locale.$STR("enablement.off");

        for (var i = 0; i < panels.length; ++i)
        {
            status = firebugStatus.getAttribute(panels[i].prototype.name) == "on" ? strOn : strOff;
            statuses.push(Locale.$STRF("panel.status", [Firebug.getPanelTitle(panels[i]), status]));
        }

        return statuses.join(", ");
    }