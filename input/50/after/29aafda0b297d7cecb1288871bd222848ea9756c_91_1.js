function(url, lineNo, bp)
            {
                // skip breakpoints of other debuggers.
                if (bp.debuggerName !== Firebug.Debugger.debuggerName)
                    return;

                FBS.clearBreakpoint(url, lineNo);
            }