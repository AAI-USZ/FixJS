function(frame, rv)
    {
        // onThrow is called for throw and for any catch that does not succeed.
        var context = this.breakContext;
        delete this.breakContext;

        if (!context)
        {
            FBTrace.sysout("debugger.onThrow, no context, try to get from frame\n");
            context = this.getContextByFrame(frame);
        }

        if (FBTrace.DBG_BP)
            FBTrace.sysout("debugger.onThrow context:" + (context ? context.getName() :
                "undefined"));

        if (!context)
            return RETURN_CONTINUE_THROW;

        if (!FBS.trackThrowCatch)
            return RETURN_CONTINUE_THROW;

        try
        {
            var isCatch = this.isCatchFromPreviousThrow(frame, context);
            if (!isCatch)
            {
                context.thrownStackTrace = StackFrame.getCorrectedStackTrace(frame, context);
                if (FBTrace.DBG_BP)
                    FBTrace.sysout("debugger.onThrow reset context.thrownStackTrace",
                        context.thrownStackTrace.frames);
            }
            else
            {
                if (FBTrace.DBG_BP)
                    FBTrace.sysout("debugger.onThrow isCatch\n");
            }
        }
        catch  (exc)
        {
            FBTrace.sysout("onThrow FAILS: "+exc+"\n");
        }

        if (Firebug.connection.dispatch("onThrow",[context, frame, rv]))
            return this.stop(context, frame, TYPE_THROW, rv);

        return RETURN_CONTINUE_THROW;
    }