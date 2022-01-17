function(context, title)
    {
        if (!memoryReporterManager)
        {
            // xxxHonza: locale if memory profiler will be part of 1.8
            Firebug.Console.log("Memory profiler component is not available on your platform.");
            return;
        }

        Firebug.chrome.setGlobalAttribute("cmd_toggleMemoryProfiling", "checked", "true");

        this.profiling = true;
        FBS.addHandler(this);

        // Initialize structures for collected memory data.
        context.memoryProfileStack = []; // Holds memory reports for called fucntions.
        context.memoryProfileResult = {}; // Holds differences between function-call and function-return.
        context.memoryProfileTime = (new Date()).getTime();

        // Memory leak detection
        this.mark(context);

        var isCustomMessage = !!title;
        if (!isCustomMessage)
            title = Locale.$STR("firebug.Memory Profiler Started");

        context.memoryProfileRow = this.logProfileRow(context, title);
        context.memoryProfileRow.customMessage = isCustomMessage;

        // For summary numbers (difference between profiling-start and profiling-end)
        context.memoryProfileStack.push(this.getMemoryReport());

        Firebug.Console.addListener(this);
    }