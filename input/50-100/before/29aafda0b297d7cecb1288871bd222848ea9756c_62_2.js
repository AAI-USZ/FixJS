function(result, context)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.onEvaluateFails; " + result, result);

        context.breakingCause = {
            title: Locale.$STR("firecookie.Break On Cookie"),
            message: Locale.$STR("firecookie.Breakpoint condition evaluation fails"),
            prevValue: this.condition, newValue:result
        };
    }