function(context)
    {
        if (context)
        {
            var units = context.getAllCompilationUnits();
            FBS.clearAllBreakpoints(units, Firebug.Debugger);
            FBS.clearErrorBreakpoints(units, Firebug.Debugger);
        }
        else
        {
            // null means all urls
            FBS.enumerateBreakpoints(null, {call: function(url, lineNo, bp)
            {
                // skip breakpoints of other debuggers.
                if (bp.debuggerName !== Firebug.Debugger.debuggerName)
                    return;

                FBS.clearBreakpoint(url, lineNo);
            }});

            // and also error breakpoints
            FBS.enumerateErrorBreakpoints(null, {call: function(url, lineNo)
            {
                FBS.clearErrorBreakpoint(url, lineNo, Firebug.Debugger);
            }});
        }
    }