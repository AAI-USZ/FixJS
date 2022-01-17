function(result, context)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onEvaluateSucceeds; " + result, result);

        // Don't set the breakingCause if the breakpoint condition is evaluated to false.
        if (!result)
            return;

        context.breakingCause = {
            title: Locale.$STR("cookies.Break On Cookie"),
            message: Str.cropString(unescape(this.name + "; " + this.condition + "; "), 200)
        };
    }