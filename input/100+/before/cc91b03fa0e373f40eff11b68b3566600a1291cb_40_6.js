function getConsoleByGlobal(global)
{
    try
    {
        var context = Firebug.connection.getContextByWindow(global);
        if (context)
        {
            var handler = Firebug.Console.injector.getConsoleHandler(context, global);
            if (handler)
            {
                FBTrace.sysout("Firebug.getConsoleByGlobal " + handler.console + " for " +
                    context.getName(), handler);

                return handler.console;
            }

            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("Firebug.getConsoleByGlobal FAILS, no handler for global " +
                    global + " " + Win.safeGetWindowLocation(global), global);
        }

        if (FBTrace.DBG_ERRORS)
            FBTrace.sysout("Firebug.getConsoleByGlobal FAILS, no context for global " +
                global, global);
    }
    catch(exc)
    {
        if(FBTrace.DBG_ERRORS)
            FBTrace.sysout("Firebug.getConsoleByGlobal FAILS " + exc, exc);
    }
}