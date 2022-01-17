function() {
            is(breakpointsRemoved, 3,
              "Should have 3 removed breakpoints.");

            is(gBreakpointsElement.childNodes.length, 1,
              "The breakpoints pane should be empty, but showing a " +
              "'no breakpoints' information message.");
            is(gBreakpointsElement.childNodes.length,
               gBreakpointsElement.querySelectorAll(".list-item.empty").length,
               "Found junk in the breakpoints container.");

            finish();
          }