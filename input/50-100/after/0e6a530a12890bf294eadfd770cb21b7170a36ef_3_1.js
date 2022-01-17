function()
    {
        this.unregisterObservers();

        // Support for trace-console customization in Firebug 1.3
        TraceModule.removeListener(this.traceListener);

        var netInfoBody = Firebug.NetMonitor.NetInfoBody;
        if ("removeListener" in netInfoBody)
            netInfoBody.removeListener(this.NetInfoBody);

        //Firebug.Console.removeListener(this.ConsoleListener);
        //Firebug.Debugger.removeListener(this.DebuggerListener);

        Firebug.unregisterUIListener(this);
    }