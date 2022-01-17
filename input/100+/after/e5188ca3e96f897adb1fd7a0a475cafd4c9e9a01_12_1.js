function createFirebugConsole(context, win)
{
    // Defined as a chrome object, but exposed into the web content scope.
    var console = {
        __exposedProps__: {}
    };

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Exposed Properties

    console.log = function log()
    {
        return logFormatted(arguments, "log", true);
    };

    console.debug = function debug()
    {
        return logFormatted(arguments, "debug", true);
    };

    console.info = function info()
    {
        return logFormatted(arguments, "info", true);
    };

    console.warn = function warn()
    {
        return logFormatted(arguments, "warn", true);
    };

    console.exception = function exception()
    {
        return logAssert("error", arguments);
    };

    console.assert = function assert(x)
    {
        if (!x)
        {
            var rest = [];
            for (var i = 1; i < arguments.length; i++)
                rest.push(arguments[i]);
            return logAssert("assert", rest);
        }

        return Console.getDefaultReturnValue(win);
    };

    console.dir = function dir(o)
    {
        Firebug.Console.log(o, context, "dir", Firebug.DOMPanel.DirTable);
        return Console.getDefaultReturnValue(win);
    };

    console.dirxml = function dirxml(o)
    {
        if (o instanceof Wrapper.getContentView(win).Window)
            o = o.document.documentElement;
        else if (o instanceof Wrapper.getContentView(win).Document)
            o = o.documentElement;

        Firebug.Console.log(o, context, "dirxml", Firebug.HTMLPanel.SoloElement);
        return Console.getDefaultReturnValue(win);
    };

    console.trace = function firebugDebuggerTracer()
    {
        var unwrapped = Wrapper.unwrapObject(win);
        unwrapped.top._firebugStackTrace = "console-tracer";
        debugger;
        delete unwrapped.top._firebugStackTrace;

        return Console.getDefaultReturnValue(win);
    };

    console.group = function group()
    {
        var sourceLink = getStackLink();
        Firebug.Console.openGroup(arguments, null, "group", null, false, sourceLink);
        return Console.getDefaultReturnValue(win);
    };

    console.groupEnd = function()
    {
        Firebug.Console.closeGroup(context);
        return Console.getDefaultReturnValue(win);
    };

    console.groupCollapsed = function()
    {
        var sourceLink = getStackLink();

        // noThrottle true can't be used here (in order to get the result row now)
        // because there can be some logs delayed in the queue and they would end up
        // in a different grup.
        // Use rather a different method that causes auto collapsing of the group
        // when it's created.
        Firebug.Console.openCollapsedGroup(arguments, null, "group", null, false, sourceLink);
        return Console.getDefaultReturnValue(win);
    };

    console.profile = function(title)
    {
        Firebug.Profiler.startProfiling(context, title);
        return Console.getDefaultReturnValue(win);
    };

    console.profileEnd = function()
    {
        Firebug.Profiler.stopProfiling(context);
        return Console.getDefaultReturnValue(win);
    };

    console.count = function(key)
    {
        var frameId = getStackFrameId();
        if (frameId)
        {
            if (!context.frameCounters)
                context.frameCounters = {};

            if (key != undefined)
                frameId += key;

            var frameCounter = context.frameCounters[frameId];
            if (!frameCounter)
            {
                var logRow = logFormatted(["0"], null, true, true);

                frameCounter = {logRow: logRow, count: 1};
                context.frameCounters[frameId] = frameCounter;
            }
            else
                ++frameCounter.count;

            var label = key == undefined
                ? frameCounter.count
                : key + " " + frameCounter.count;

            frameCounter.logRow.firstChild.firstChild.nodeValue = label;
        }
        return Console.getDefaultReturnValue(win);
    };

    console.clear = function()
    {
        Firebug.Console.clear(context);
        return Console.getDefaultReturnValue(win);
    };

    console.time = function(name, reset)
    {
        if (!name)
            return Console.getDefaultReturnValue(win);

        var time = new Date().getTime();

        if (!this.timeCounters)
            this.timeCounters = {};

        var key = "KEY"+name.toString();

        if (!reset && this.timeCounters[key])
            return Console.getDefaultReturnValue(win);

        this.timeCounters[key] = time;
        return Console.getDefaultReturnValue(win);
    };

    console.timeEnd = function(name)
    {
        var time = new Date().getTime();

        if (!this.timeCounters)
            return Console.getDefaultReturnValue(win);

        var key = "KEY"+name.toString();

        var timeCounter = this.timeCounters[key];
        if (timeCounter)
        {
            var diff = time - timeCounter;
            var label = name + ": " + diff + "ms";

            this.info(label);

            delete this.timeCounters[key];
        }
        return diff;
    };

    console.timeStamp = function(label)
    {
        label = label || "";

        if (FBTrace.DBG_CONSOLE)
            FBTrace.sysout("consoleExposed.timeStamp; " + label);

        var now = new Date();
        Firebug.NetMonitor.addTimeStamp(context, now.getTime(), label);

        var formattedTime = now.getHours() + ":" + now.getMinutes() + ":" +
            now.getSeconds() + "." + now.getMilliseconds();
        return logFormatted([formattedTime, label], "timeStamp");
    };

    console.table = function(data, columns)
    {
        FirebugReps.Table.log(data, columns, context);
        return Console.getDefaultReturnValue(win);
    };

    console.error = function error()
    {
        // TODO stack trace
        if (arguments.length == 1)
        {
            return logAssert("error", arguments);  // add more info based on stack trace
        }
        else
        {
            Errors.increaseCount(context);
            return logFormatted(arguments, "error", true);  // user already added info
        }
    };

    // xxxHonza: removed from 1.10 (issue 5599)
    /*console.memoryProfile = function(title)
    {
        Firebug.MemoryProfiler.start(context, title);
        return Console.getDefaultReturnValue(win);
    };

    console.memoryProfileEnd = function()
    {
        Firebug.MemoryProfiler.stop(context);
        return Console.getDefaultReturnValue(win);
    };*/

    // Expose only these properties to the content scope (read only).
    console.__exposedProps__.log = "r";
    console.__exposedProps__.debug = "r";
    console.__exposedProps__.info = "r";
    console.__exposedProps__.warn = "r";
    console.__exposedProps__.exception = "r";
    console.__exposedProps__.assert = "r";
    console.__exposedProps__.dir = "r";
    console.__exposedProps__.dirxml = "r";
    console.__exposedProps__.trace = "r";
    console.__exposedProps__.group = "r";
    console.__exposedProps__.groupEnd = "r";
    console.__exposedProps__.groupCollapsed = "r";
    console.__exposedProps__.time = "r";
    console.__exposedProps__.timeEnd = "r";
    console.__exposedProps__.timeStamp = "r";
    console.__exposedProps__.profile = "r";
    console.__exposedProps__.profileEnd = "r";
    console.__exposedProps__.count = "r";
    console.__exposedProps__.clear = "r";
    console.__exposedProps__.table = "r";
    console.__exposedProps__.error = "r";
    //console.__exposedProps__.memoryProfile = "r";
    //console.__exposedProps__.memoryProfileEnd = "r";

    // DBG console.uid = Math.random();

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Helpers (not accessible from web content)

    function logFormatted(args, className, linkToSource, noThrottle)
    {
        var sourceLink;

        // Using JSD to get user stack is time consuming.
        if (Options.get("preferJSDSourceLinks"))
        {
            var stack = getJSDUserStack();
            if (stack && stack.toSourceLink)
                sourceLink = stack.toSourceLink();
        }

        if (!sourceLink)
            sourceLink = linkToSource ? getStackLink() : null;

        var ignoreReturnValue = Firebug.Console.getDefaultReturnValue(win);
        var rc = Firebug.Console.logFormatted(args, context, className, noThrottle, sourceLink);
        return rc ? rc : ignoreReturnValue;
    };

    function logAssert(category, args)
    {
        Errors.increaseCount(context);

        if (!args || !args.length || args.length == 0)
            var msg = [Locale.$STR("Assertion")];
        else
            var msg = args[0];

        // If there's no error message, there's also no stack trace. See Issue 4700.
        if (!msg)
        {
            var trace = null;
        }
        else if (msg.stack)
        {
            var trace = StackFrame.parseToStackTrace(msg.stack, context);
            if (FBTrace.DBG_CONSOLE)
                FBTrace.sysout("logAssert trace from msg.stack", trace);
        }
        else if (context.stackTrace)
        {
            var trace = context.stackTrace;
            if (FBTrace.DBG_CONSOLE)
                FBTrace.sysout("logAssert trace from context.window.stackTrace", trace);
        }
        else
        {
            var trace = getJSDUserStack();
            if (FBTrace.DBG_CONSOLE)
                FBTrace.sysout("logAssert trace from getJSDUserStack", trace);
        }

        trace = StackFrame.cleanStackTraceOfFirebug(trace);

        var url = msg && msg.fileName ? msg.fileName : win.location.href;

        // we may have only the line popped above
        var lineNo = (trace && msg && msg.lineNumber) ? msg.lineNumber : 0;
        var errorObject = new FirebugReps.ErrorMessageObj(msg, url, lineNo, "",
            category, context, trace);

        if (trace && trace.frames && trace.frames[0])
            errorObject.correctWithStackTrace(trace);

        errorObject.resetSource();

        if (args.length > 1)
        {
            errorObject.objects = []
            for (var i = 1; i < args.length; i++)
                errorObject.objects.push(args[i]);
        }

        var row = Firebug.Console.log(errorObject, context, "errorMessage");
        if (row)
            row.scrollIntoView();

        return Console.getDefaultReturnValue(win);
    };

    function getComponentsStackDump()
    {
        // Starting with our stack, walk back to the user-level code
        var frame = Components.stack;
        var userURL = win.location.href.toString();

        if (FBTrace.DBG_CONSOLE)
            FBTrace.sysout("consoleInjector.getComponentsStackDump initial stack for userURL " +
                userURL, frame);

        // Drop frames until we get into user code.
        while (frame && Url.isSystemURL(frame.filename) )
            frame = frame.caller;

        // Drop two more frames, the injected console function and firebugAppendConsole()
        //if (frame)
        //    frame = frame.caller;
        //if (frame)
        //    frame = frame.caller;

        if (FBTrace.DBG_CONSOLE)
            FBTrace.sysout("consoleInjector.getComponentsStackDump final stack for userURL " +
                userURL, frame);

        return frame;
    };

    function getStackLink()
    {
        return StackFrame.getFrameSourceLink(getComponentsStackDump());
    };

    function getJSDUserStack()
    {
        var trace = Firebug.Debugger.getCurrentStackTrace(context);

        var frames = trace ? trace.frames : null;
        if (frames && (frames.length > 0) )
        {
            var filteredFrames = [];

            for (var i = 0; i < frames.length; i++)
            {
                if (Str.hasPrefix(frames[i].href, "chrome:"))
                    continue;

                if (Str.hasPrefix(frames[i].href, "resource:"))
                    continue;

                // firebug-service scope reached, in some cases the url starts with file://
                if (frames[i].href.indexOf("modules/firebug-service.js") != -1)
                    continue;

                // command line
                var fn = frames[i].getFunctionName() + "";
                if (fn && (fn.indexOf("_firebugEvalEvent") != -1))
                    continue;

                filteredFrames.push(frames[i]);
            }

            // take the oldest frames, leave 2 behind they are injection code
            trace.frames = filteredFrames; //trace.frames.slice(2 - i);

            return trace;
        }
        else
        {
            return "Firebug failed to get stack trace with any frames";
        }
    };

    function getStackFrameId(inputFrame)
    {
        for (var frame = Components.stack; frame; frame = frame.caller)
        {
            if (frame.languageName == "JavaScript"
                && !(frame.filename && frame.filename.indexOf("://firebug/") > 0))
            {
                return frame.filename + "/" + frame.lineNumber;
            }
        }
        return null;
    };

    return console;
}