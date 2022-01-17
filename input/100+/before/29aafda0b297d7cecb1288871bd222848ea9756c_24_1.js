function(context)
    {
        var chrome = Firebug.chrome;
        if (!chrome)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("debugger.syncCommand, context with no chrome: " +
                    context.getGlobalScope());

            return;
        }

        if (context.stopped)
        {
            chrome.setGlobalAttribute("fbDebuggerButtons", "stopped", "true");
            chrome.setGlobalAttribute("cmd_rerun", "disabled", "false");
            chrome.setGlobalAttribute("cmd_resumeExecution", "disabled", "false");
            chrome.setGlobalAttribute("cmd_stepOver", "disabled", "false");
            chrome.setGlobalAttribute("cmd_stepInto", "disabled", "false");
            chrome.setGlobalAttribute("cmd_stepOut", "disabled", "false");
        }
        else
        {
            chrome.setGlobalAttribute("fbDebuggerButtons", "stopped", "false");
            chrome.setGlobalAttribute("cmd_rerun", "disabled", "true");
            chrome.setGlobalAttribute("cmd_stepOver", "disabled", "true");
            chrome.setGlobalAttribute("cmd_stepInto", "disabled", "true");
            chrome.setGlobalAttribute("cmd_stepOut", "disabled", "true");
            chrome.setGlobalAttribute("cmd_resumeExecution", "disabled", "true");
        }
    }