function()
    {
        var fbStatus = Firefox.getElementById('firebugStatus');
        if (fbStatus)
        {
            if (Firebug.Errors.watchForErrors)
                fbStatus.setAttribute("console", "on");
            else
                fbStatus.removeAttribute("console");
        }
        else
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("console.setStatus ERROR no firebugStatus element");
        }
    }