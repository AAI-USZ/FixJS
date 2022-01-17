function(context, fullName, url)
    {
        try
        {
            Services.scriptloader.loadSubScript(url, context);

            if (FBTrace.DBG_MODULES)
                FBTrace.sysout("mini-require; Module loaded " + fullName, url);
        }
        catch (err)
        {
            Cu.reportError(fullName + " -> " + url);
            Cu.reportError(err);
        }
    }