function(context, object, isWarning)
    {
        if (!context)
            return;

        if (FBTrace.DBG_ERRORLOG)
        {
            FBTrace.sysout("errors.observe logScriptError " +
                (Firebug.errorStackTrace ? "have " : "NO ") +
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

        if (Firebug.showStackTrace && Firebug.errorStackTrace)
        {
            // Firebug.errorStackTrace is set in onError (JSD hook).
            // However it can happen that the stack trace doesn't belong to the error
            // happening here (e.g. onError is not executed for throws).
            // So, use the url and line number to check whether the remembered stack
            // corresponds to what the current error says (see issue 5400).
            // Note that this can exclude come stacks:
            // see https://bugzilla.mozilla.org/show_bug.cgi?id=703519
            var trace = Firebug.errorStackTrace;
            var frame = (trace.frames && trace.frames[0]) ? trace.frames[0] : null;
            if (frame && frame.href == error.href && frame.line == error.lineNo)
                error.correctWithStackTrace(trace);
        }
        else if (checkForUncaughtException(context, object))
        {
            context = getExceptionContext(context, object);
            correctLineNumbersOnExceptions(object, error);
        }

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