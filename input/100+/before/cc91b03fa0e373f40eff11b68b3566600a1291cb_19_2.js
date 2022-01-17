function(context)
    {
        if (Firebug.Breakpoint && Firebug.Breakpoint.updatePanelTab)
        {
            var panel = context.getPanel(panelName, true);
            Firebug.Breakpoint.updatePanelTab(panel, false);

            // xxxHonza: fix this
            // Don't utilize Firebug.Breakpoint.breakNow since the code doesn't
            // exclude firecookie files from the stack (chrome://firecookie/)
            // Firebug.Debugger.breakNowURLPrefix must be changed to: "chrome://",
            //Firebug.Breakpoint.breakNow(context.getPanel(panelName, true));
            //return;
        }

        Firebug.Debugger.halt(function(frame)
        {
            if (FBTrace.DBG_COOKIES)
                FBTrace.sysout("cookies.breakNow; debugger halted");

            for (; frame && frame.isValid; frame = frame.callingFrame)
            {
                var fileName = frame.script.fileName;
                if (fileName &&
                    fileName.indexOf("chrome://firebug/") != 0 &&
                    fileName.indexOf("chrome://firecookie/") != 0 &&
                    fileName.indexOf("/components/firebug-") == -1 &&
                    fileName.indexOf("/modules/firebug-") == -1)
                    break;
            }

            if (frame)
            {
                Firebug.Debugger.breakContext = context;
                Firebug.Debugger.onBreak(frame, 3);
            }
            else
            {
                if (FBTrace.DBG_COOKIES)
                    FBTrace.sysout("cookies.breakNow; NO FRAME");
            }
        });
    }