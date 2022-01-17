function()
    {
        Firebug.MemoryProfiler.stop(context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    }