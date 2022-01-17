function(title)
    {
        Firebug.MemoryProfiler.start(context, title);
        return Console.getDefaultReturnValue(win);
    }