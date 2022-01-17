function checkForException(context, object)
{
    if (object.flags & object.exceptionFlag)
    {
        if (FBTrace.DBG_ERRORLOG)
            FBTrace.sysout("errors.observe is exception");

        if (context.thrownStackTrace)
        {
            Firebug.errorStackTrace = context.thrownStackTrace;

            if (FBTrace.DBG_ERRORLOG)
                FBTrace.sysout("errors.observe trace.frames", context.thrownStackTrace.frames);

            delete context.thrownStackTrace;
        }
        else
        {
             if (FBTrace.DBG_ERRORLOG)
                FBTrace.sysout("errors.observe NO context.thrownStackTrace");
        }
        return true;
    }

    delete context.thrownStackTrace;
    return false;
}