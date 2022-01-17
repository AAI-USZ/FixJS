function(context, cancelReport)
    {
        FBS.removeHandler(this);
        this.profiling = false;

        Firebug.chrome.setGlobalAttribute("cmd_toggleMemoryProfiling", "checked", "false");

        // Calculate total diff
        var oldReport = context.memoryProfileStack.pop();
        var newReport = this.getMemoryReport();

        context.memoryProfileSummary = this.diffMemoryReport(oldReport, newReport);
        context.memoryProfileTime = (new Date()).getTime() - context.memoryProfileTime;

        this.logProfileReport(context, context.memoryProfileResult);

        delete context.memoryProfileRow;
        delete context.memoryProfileStack;
        delete context.memoryProfileResult;

        // Memory leak detection
        var deltaObjects = this.sweep(context);
        this.cleanUp(context);

        if (!cancelReport)
        {
            var title = Locale.$STR("firebug.Objects Added While Profiling");
            var row = Firebug.Console.openCollapsedGroup(title, context, "profile",
                Firebug.MemoryProfiler.ProfileCaption, true, null, true);
    
            Firebug.Console.log(deltaObjects, context, "memoryDelta", Firebug.DOMPanel.DirTable);
            Firebug.Console.closeGroup(context, true);
        }

        Firebug.Console.removeListener(this);

        //Firebug.Console.logFormatted([deltaObjects], context, "memoryDelta");
    }