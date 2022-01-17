function handleNodeMatches(event)
    {
        if (window.closed)
            throw "WINDOW CLOSED watching:: "+(filter.recognizer.win.closed?"closed":filter.recognizer.win.location)+" closed window: "+filter.winName;

        if (FBTrace.DBG_TESTCASE_MUTATION)
            FBTrace.sysout("onMutateNode "+event.target+" in "+event.target.ownerDocument.location, event.target);

        try
        {
            var child = filter.checkElementDeep(event.target);
            if (child)
                handler(child);
        }
        catch(exc)
        {
            if (FBTrace.DBG_TESTCASE_MUTATION)
                FBTrace.sysout("onMutateNode FAILS "+exc, exc);
        }
    }