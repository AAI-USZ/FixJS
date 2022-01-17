function handleAttrMatches(event)
    {
        if (window.closed)
            throw "WINDOW CLOSED watching:: "+(filter.recognizer.win.closed?
                "closed":filter.recognizer.win.location)+" closed window: "+filter.winName;

        if (!recognizer.changedAttributes)
            return; // we don't care about attribute mutation

        if (FBTrace.DBG_TESTCASE_MUTATION)
            FBTrace.sysout("onMutateAttr "+event.attrName+"=>"+event.newValue+" on "+event.target+
                " in "+event.target.ownerDocument.location, event.target);

        // We care about some attribute mutation.
        if (!recognizer.changedAttributes.hasOwnProperty(event.attrName))
        {
            if (FBTrace.DBG_TESTCASE_MUTATION)
                FBTrace.sysout("onMutateAttr not interested in "+event.attrName+"=>"+event.newValue+
                    " on "+event.target+" in "+event.target.ownerDocument.location, event.target);
            return;  // but not the one that changed.
        }

        try
        {
            if (filter.checkElement(event.target))
                handler(event.target);
        }
        catch(exc)
        {
            if (FBTrace.DBG_TESTCASE_MUTATION)
                FBTrace.sysout("onMutateNode FAILS "+exc, exc);
        }
    }