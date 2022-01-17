function finalCheck() {
    is(Object.keys(gBreakpoints).length, 0, "no breakpoint in the debugger");
    ok(!gPane.getBreakpoint(gScripts.scriptLocations[0], 5),
       "getBreakpoint(scriptLocations[0], 5) returns no breakpoint");
  }