function(enable)
    {
        if (FBTrace.DBG_COOKIES || FBTrace.DBG_ACTIVATION)
            FBTrace.sysout("firecookie.FireCookiePanel.onActivationChanged; " + enable);

        if (enable)
        {
            Firebug.CookieModule.addObserver(this);
            Firebug.Debugger.addListener(Firebug.CookieModule.DebuggerListener);
            Firebug.Console.addListener(Firebug.CookieModule.ConsoleListener);
        }
        else
        {
            Firebug.CookieModule.removeObserver(this);
            Firebug.Debugger.removeListener(Firebug.CookieModule.DebuggerListener);
            Firebug.Console.removeListener(Firebug.CookieModule.ConsoleListener);
        }
    }