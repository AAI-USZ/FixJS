function(expr, context, thisValue, targetWindow, successConsoleFunction,
        exceptionFunction, noStateChange)
    {
        if (!context)
            return;

        try
        {
            var result = null;
            var debuggerState = Firebug.Debugger.beginInternalOperation();

            if (this.isSandbox(context))
            {
                result = this.evaluateInSandbox(expr, context, thisValue, targetWindow,
                    successConsoleFunction, exceptionFunction);
            }
            else if (Firebug.Debugger.hasValidStack(context))
            {
                result = this.evaluateInDebugFrame(expr, context, thisValue, targetWindow,
                    successConsoleFunction, exceptionFunction);
            }
            else
            {
                result = this.evaluateByEventPassing(expr, context, thisValue, targetWindow,
                    successConsoleFunction, exceptionFunction);
            }

            if (!noStateChange)
                context.invalidatePanels("dom", "html");
        }
        catch (exc)
        {
            // XXX jjb, I don't expect this to be taken, the try here is for the finally
            if (FBTrace.DBG_ERRORS && FBTrace.DBG_COMMANDLINE)
            {
                FBTrace.sysout("commandLine.evaluate with context.stopped:" + context.stopped +
                    " EXCEPTION " + exc, exc);
            }
        }
        finally
        {
            Firebug.Debugger.endInternalOperation(debuggerState);
        }

        return result;
    }