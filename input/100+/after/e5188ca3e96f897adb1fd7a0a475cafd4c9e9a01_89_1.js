function(context, object, isWarning)
    {
        if (!context)
            return;

        if (FBTrace.DBG_ERRORLOG)
        {
            FBTrace.sysout("errors.observe logScriptError " +
                (Firebug.errorStackTrace ? "have " : "NO ") +
                (Firebug.showStackTrace ? "show stack trace" : "do not show stack trace ") +
                "errorStackTrace error object:",
                {object: object, errorStackTrace: Firebug.errorStackTrace});
        }

        var category = getBaseCategory(object.category);
        var isJSError = category == "js" && !isWarning;

        // the sourceLine will cause the source to be loaded.
        var error = new FirebugReps.ErrorMessageObj(object.errorMessage, object.sourceName,
            object.lineNumber, object.sourceLine, category, context, null, msgId);

        // Display column info only if it isn't zero.
        if (object.columnNumber > 0)
            error.colNumber = object.columnNumber;

        if (checkForException(context, object))
        {
            context = getExceptionContext(context, object);
            correctLineNumbersOnExceptions(object, error);
        }

        if (Firebug.showStackTrace && Firebug.errorStackTrace)
            error.correctWithStackTrace(Firebug.errorStackTrace);

        var msgId = lessTalkMoreAction(context, object, isWarning);
        if (!msgId)
            return null;

        // clear global: either we copied it or we don't use it.
        Firebug.errorStackTrace = null;

        if (!isWarning)
            this.increaseCount(context);

        var className = isWarning ? "warningMessage" : "errorMessage";

        if (FBTrace.DBG_ERRORLOG)
            FBTrace.sysout("errors.observe delayed log to " + context.getName());

        // report later to avoid loading sourceS
        context.throttle(this.delayedLogging, this, [msgId, context, error, context, className,
            false, true], true);
    }