function(frame, rv)
    {
        // onThrow is called for throw, for catches that do not succeed,
        // and for functions that exceptions pass through.
        var context = this.breakContext;
        delete this.breakContext;

        if (!context)
        {
            if (FBTrace.DBG_BP)
                FBTrace.sysout("debugger.onThrow, no context, try to get from frame\n");
            context = this.getContextByFrame(frame);
        }

        if (FBTrace.DBG_ERRORLOG)
        {
            var lines = [];
            var frames = StackFrame.getCorrectedStackTrace(frame, context).frames;
            for (var i=0; i<frames.length; i++)
                lines.push(frames[i].line + ", " + frames[i].fn);

            FBTrace.sysout("debugger.onThrow context:" + (context ? context.getName() :
                "undefined") + ", " + lines.join("; "), frames);
        }

        if (!context)
            return RETURN_CONTINUE_THROW;

        if (!FBS.showStackTrace)
            return RETURN_CONTINUE_THROW;

        try
        {
            var realThrow = this.isRealThrow(frame, context);
            if (realThrow)
            {
                context.thrownStackTrace = StackFrame.getCorrectedStackTrace(frame, context);

                if (FBTrace.DBG_BP)
                    FBTrace.sysout("debugger.onThrow reset context.thrownStackTrace",
                        context.thrownStackTrace.frames);

                // xxxHonza: this could fix Issue 3276: Track Throw/Catch is not working
                /*if (FBS.trackThrowCatch)
                {
                    var object = {
                        errorMessage: errorObject.value.stringValue,
                        message: errorObject.value.stringValue,
                        sourceName: "",
                        lineNumber: -1,
                        sourceLine: "",
                        category: "javascript",
                        flags: 2,
                        exceptionFlag: 2,
                    };

                    Firebug.Errors.logScriptError(context, object, false);

                    context.thrownStackTrace = StackFrame.getCorrectedStackTrace(frame, context);
                }*/
            }
            else
            {
                if (FBTrace.DBG_BP)
                    FBTrace.sysout("debugger.onThrow not a real throw");
            }
        }
        catch (exc)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("onThrow FAILS: " + exc, exc);
        }

        if (Firebug.connection.dispatch("onThrow",[context, frame, rv]))
            return this.stop(context, frame, TYPE_THROW, rv);

        return RETURN_CONTINUE_THROW;
    }