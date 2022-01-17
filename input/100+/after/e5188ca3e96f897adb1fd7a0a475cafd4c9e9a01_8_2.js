function FirebugCommandLineAPI(context)
{
    this.$ = function(id)  // returns unwrapped elements from the page
    {
        return Wrapper.unwrapObject(context.baseWindow.document).getElementById(id);
    };

    this.$$ = function(selector) // returns unwrapped elements from the page
    {
        var result = Wrapper.unwrapObject(context.baseWindow.document).querySelectorAll(selector);
        return Arr.cloneArray(result);
    };

    this.$x = function(xpath) // returns unwrapped elements from the page
    {
        return Xpath.getElementsByXPath(Wrapper.unwrapObject(context.baseWindow.document), xpath);
    };

    this.$n = function(index) // values from the extension space
    {
        var htmlPanel = context.getPanel("html", true);
        if (!htmlPanel)
            return null;

        if (index < 0 || index >= htmlPanel.inspectorHistory.length)
            return null;

        var node = htmlPanel.inspectorHistory[index];
        if (!node)
            return node;

        return Wrapper.unwrapObject(node);
    };

    this.cd = function(object)
    {
        if (!(object instanceof window.Window))
            throw "Object must be a window.";

        // Make sure the command line is attached into the target iframe.
        var consoleReady = Firebug.Console.isReadyElsePreparing(context, object);
        if (FBTrace.DBG_COMMANDLINE)
            FBTrace.sysout("commandLine.cd; console ready: " + consoleReady);

        // The window object parameter uses XPCSafeJSObjectWrapper, but we need XPCNativeWrapper
        // So, look within all registered consoleHandlers for
        // the same window (from tabWatcher) that uses uses XPCNativeWrapper (operator "==" works).
        var entry = Firebug.Console.injector.getConsoleHandler(context, object);
        if (entry)
            context.baseWindow = entry.win;

        Firebug.Console.log(["Current window:", context.baseWindow], context, "info");
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.clear = function()  // no web page interaction
    {
        Firebug.Console.clear(context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.inspect = function(obj, panelName)  // no web page interaction
    {
        Firebug.chrome.select(obj, panelName);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.keys = function(o)
    {
        return Arr.keys(o);  // the object is from the page, unwrapped
    };

    this.values = function(o)
    {
        return Arr.values(o); // the object is from the page, unwrapped
    };

    this.debug = function(fn)
    {
        Firebug.Debugger.monitorFunction(fn, "debug");
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.undebug = function(fn)
    {
        Firebug.Debugger.unmonitorFunction(fn, "debug");
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.monitor = function(fn)
    {
        Firebug.Debugger.monitorFunction(fn, "monitor");
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.unmonitor = function(fn)
    {
        Firebug.Debugger.unmonitorFunction(fn, "monitor");
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.traceAll = function()
    {
        Firebug.Debugger.traceAll(Firebug.currentContext);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.untraceAll = function()
    {
        Firebug.Debugger.untraceAll(Firebug.currentContext);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.traceCalls = function(fn)
    {
        Firebug.Debugger.traceCalls(Firebug.currentContext, fn);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.untraceCalls = function(fn)
    {
        Firebug.Debugger.untraceCalls(Firebug.currentContext, fn);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.monitorEvents = function(object, types)
    {
        EventMonitor.monitorEvents(object, types, context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.unmonitorEvents = function(object, types)
    {
        EventMonitor.unmonitorEvents(object, types, context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.profile = function(title)
    {
        Firebug.Profiler.startProfiling(context, title);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.profileEnd = function()
    {
        Firebug.Profiler.stopProfiling(context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.copy = function(x)
    {
        System.copyToClipboard(x);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.help = function()
    {
        CommandLineHelp.render(context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    // xxxHonza: removed from 1.10 (issue 5599)
    /*this.memoryProfile = function(title)
    {
        Firebug.MemoryProfiler.start(context, title);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };

    this.memoryProfileEnd = function()
    {
        Firebug.MemoryProfiler.stop(context);
        return Firebug.Console.getDefaultReturnValue(context.window);
    };*/
}