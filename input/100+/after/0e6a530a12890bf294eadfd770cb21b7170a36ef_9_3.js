function()
    {
        var firebugStatus = Firefox.getElementById("firebugStatus");
        if (!firebugStatus)
            return;

        var panels = Firebug.getActivablePanelTypes();
        var statuses = [];

        var strOn = Locale.$STR("enablement.on");
        var strOff = Locale.$STR("enablement.off");

        for (var i=0; i<panels.length; ++i)
        {
            var panelName = panels[i].prototype.name;
            var status = firebugStatus.getAttribute(panelName);
            var statusLabel = (status == "on") ? strOn : strOff;

            statuses.push({
                name: Firebug.getPanelTitle(panels[i]),
                status: status,
                statusLabel: statusLabel
            });
        }

        return statuses;
    }