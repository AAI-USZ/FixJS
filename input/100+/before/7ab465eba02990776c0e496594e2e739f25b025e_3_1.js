function() {
    is(Object.keys(gBreakpoints).length, 0, "no breakpoint in the debugger");
    ok(!gPane.getBreakpoint(gScripts.scriptLocations[0], 5),
       "getBreakpoint(scriptLocations[0], 5) returns no breakpoint");

    is(breakpointsAdded, 3, "correct number of breakpoints have been added");
    is(breakpointsDisabled, 3, "correct number of breakpoints have been disabled");
    is(breakpointsRemoved, 3, "correct number of breakpoints have been removed");
    removeTab(gTab);
    gPane = null;
    gTab = null;
    gDebuggee = null;
    gDebugger = null;
    gScripts = null;
    gBreakpoints = null;
    gBreakpointsElement = null;
  }