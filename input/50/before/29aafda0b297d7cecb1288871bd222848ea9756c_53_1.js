function(title)
    {
        Firebug.MemoryProfiler.start(context, title);
        return Firebug.Console.getDefaultReturnValue(context.window);
    }