function(context, cancelReport)
    {
        var totalTime = FBS.stopProfiling();
        if (totalTime == -1)
            return;

        Firebug.chrome.setGlobalAttribute("cmd_toggleProfiling", "checked", "false");

        if (cancelReport)
            delete context.profileRow;
        else
            this.logProfileReport(context, cancelReport);

        Firebug.Console.removeListener(this);

        // stopProfiling event fired within logProfileReport
    }