function checkForUncaughtException(context, object)
{
    if (object.flags & object.exceptionFlag)
    {
        if (FBTrace.DBG_ERRORLOG)
            FBTrace.sysout("errors.observe is exception");

        if (reUncaught.test(object.errorMessage))
        {
            if (FBTrace.DBG_ERRORLOG)
                FBTrace.sysout("uncaught exception matches " + reUncaught);

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
        else
        {
            if (FBTrace.DBG_ERRORLOG)
                FBTrace.sysout("errors.observe not an uncaught exception");
        }
    }

    delete context.thrownStackTrace;
    return false;
}