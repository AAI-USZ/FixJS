function(context)
    {
        if (context)
        {
            var units = context.getAllCompilationUnits();
            FBS.clearAllBreakpoints(units, Firebug.Debugger);
        }
        else
        {
            // null means all urls
            FBS.enumerateBreakpoints(null, {call: function(url, lineNo, bp)
            {
                // skip breakpoints of other debuggers.
                if (bp.debuggerName !== Firebug.Debugger.debuggerName)
                    return;

                // then we want to clear only one context,
                // so skip URLs in other contexts
                if (context && !context.getCompilationUnit(url))
                    return;

                FBS.clearBreakpoint(url, lineNo);
            }});
        }
    }