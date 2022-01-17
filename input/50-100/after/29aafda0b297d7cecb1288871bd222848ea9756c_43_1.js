function(browser)
    {
        try
        {
            var annotation = "firebugged.showFirebug";
            this.setPageAnnotation(browser.currentURI.spec, annotation);
        }
        catch (e)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("activation.watchBrowser; EXCEPTION " + e, e);
        }
    }