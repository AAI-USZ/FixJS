function()
    {
        var strOn = Locale.$STR("enablement.on");
        var strOff = Locale.$STR("enablement.off");

        var status = "";
        var firebugStatus = Firefox.getElementById("firebugStatus");

        if (!firebugStatus)
            return;

        if (firebugStatus.getAttribute("console") == "on")
            status += "Console: " + strOn + ",";
        else
            status += "Console: " + strOff + ",";

        if (firebugStatus.getAttribute("script") == "on")
            status += " Script: " + strOn;
        else
            status += " Script: " + strOff + "";

        if (firebugStatus.getAttribute("net") == "on")
            status += " Net: " + strOn + ",";
        else
            status += " Net: " + strOff + ",";

        return status;
    }