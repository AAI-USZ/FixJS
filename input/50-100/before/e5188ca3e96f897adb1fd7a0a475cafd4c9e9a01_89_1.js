function getExceptionContext(context, object)
{
    var errorWin = getErrorWindow(object)
    if (errorWin)
    {
        var errorContext = Firebug.connection.getContextByWindow(errorWin);
        if (FBTrace.DBG_ERRORLOG)
        {
            FBTrace.sysout("errors.observe exception context: " +
                (errorContext ? errorContext.getName() : "none") + " errorWin: " +
                    Win.safeGetWindowLocation(errorWin));
        }

        if (errorContext)
            return errorContext;
    }

    return context;
}