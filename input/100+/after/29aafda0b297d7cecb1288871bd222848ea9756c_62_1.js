function(context, cookie, action)
    {
        if (FBTrace.DBG_COOKIES)
            FBTrace.sysout("cookies.breakOnCookie; " + action);

        var halt = false;
        var conditionIsFalse = false;

        // If there is an enabled breakpoint with condition:
        // 1) break if the condition is evaluated to true.
        var bp = context.cookies.breakpoints.findBreakpoint(CookieUtils.makeCookieObject(cookie));
        if (bp && bp.checked)
        {
            halt = true;
            if (bp.condition)
            {
                halt = bp.evaluateCondition(context, cookie);
                conditionIsFalse = !halt;
            }
        }

        // 2) If break on next flag is set and there is no condition evaluated to false,
        // break with "break on next" breaking cause (this new breaking cause can override
        // an existing one that is set when evaluating a breakpoint condition).
        if (context.breakOnCookie && !conditionIsFalse)
        {
            context.breakingCause = {
                title: Locale.$STR("cookies.Break On Cookie"),
                message: Str.cropString(unescape(cookie.name + "; " + cookie.value), 200)
            };
            halt = true;
        }

        // Ignore if there is no reason to break.
        if (!halt)
            return;

        // Even if the execution was stopped at breakpoint reset the global
        // breakOnCookie flag.
        context.breakOnCookie = false;

        this.breakNow(context);

        // Clear breakpoint associated with removed cookie.
        if (action == "deleted")
        {
            breakpoints.removeBreakpoint(bp);
            context.invalidatePanels("breakpoints");
        }
    }