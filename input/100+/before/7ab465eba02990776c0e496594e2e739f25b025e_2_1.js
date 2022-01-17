function() {
    is(Object.keys(gBreakpoints).length, 0, "no breakpoint in the debugger");
    ok(!gPane.getBreakpoint(gScripts.scriptLocations[0], 5),
       "getBreakpoint(scriptLocations[0], 5) returns no breakpoint");

    removeTab(gTab);
    is(breakpointsAdded, 2, "correct number of breakpoints have been added");
    is(breakpointsRemoved, 1, "correct number of breakpoints have been removed");
    is(editorBreakpointChanges, 4, "correct number of editor breakpoint changes");
    gPane = null;
    gTab = null;
    gDebuggee = null;
    gDebugger = null;
    gScripts = null;
    gEditor = null;
    gBreakpoints = null;
  }