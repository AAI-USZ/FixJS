function(result, context)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onEvaluateFails; " + result, result);

        context.breakingCause = {
            title: Locale.$STR("cookies.Break On Cookie"),
            message: Locale.$STR("cookies.Breakpoint condition evaluation fails"),
            prevValue: this.condition, newValue:result
        };
    }