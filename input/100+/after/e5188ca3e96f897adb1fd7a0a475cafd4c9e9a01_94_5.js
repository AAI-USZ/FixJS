function()
    {
        var fbStatus = Firefox.getElementById("firebugStatus");
        if (fbStatus)
        {
            if (this.hasObservers())
                fbStatus.setAttribute(panelName, "on");
            else
                fbStatus.removeAttribute(panelName);
        }
        else
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("cookies.setStatus ERROR no firebugStatus element");
        }
    }