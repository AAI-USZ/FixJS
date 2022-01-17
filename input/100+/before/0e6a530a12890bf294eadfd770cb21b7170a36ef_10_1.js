function() // 1.3.1 safe for multiple calls
    {
        if (FBTrace.DBG_ACTIVATION)
            FBTrace.sysout("registerDebugger");

        // this will eventually set 'jsd' on the statusIcon
        var check = FBS.registerDebugger(this);

        if (FBTrace.DBG_ACTIVATION)
            FBTrace.sysout("debugger.registerDebugger "+check+" debuggers");
    }