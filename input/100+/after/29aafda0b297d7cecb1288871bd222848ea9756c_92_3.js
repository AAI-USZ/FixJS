function(frame)
    {
        if (FBTrace.DBG_UI_LOOP)
            FBTrace.sysout("script.startDebugging enter context: " + this.context.getName());

        try
        {
            var currentBreakable = Firebug.chrome.getGlobalAttribute("cmd_firebug_toggleBreakOn",
                "breakable");

            if (FBTrace.DBG_BP)
            {
                FBTrace.sysout("debugger.startDebugging; currentBreakable " + currentBreakable +
                    " in " + this.context.getName() + " currentContext " +
                    Firebug.currentContext.getName());
            }

            // If currentBreakable is false, then we are armed, but we broke
            if (currentBreakable == "false")
                Firebug.chrome.setGlobalAttribute("cmd_firebug_toggleBreakOn", "breakable", "true");

            // If Firebug is minimized, open the UI to show we are stopped
            if (Firebug.isMinimized())
                Firebug.unMinimize();

            this.syncCommands(this.context);
            this.syncListeners(this.context);

            // Update Break on Next lightning
            Firebug.Breakpoint.updatePanelTab(this, false);
            Firebug.chrome.select(frame, "script", null, true);
            Firebug.chrome.syncPanel("script");  // issue 3463 and 4213
            Firebug.chrome.focus();
        }
        catch(exc)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("Resuming debugger: error during debugging loop: " + exc, exc);

            Firebug.Console.log("Resuming debugger: error during debugging loop: " + exc);
            this.resume(this.context);
        }

        if (FBTrace.DBG_UI_LOOP)
        {
            FBTrace.sysout("script.onStartDebugging exit context.stopped:" +
                this.context.stopped + " for context: " + this.context.getName());
        }
    }