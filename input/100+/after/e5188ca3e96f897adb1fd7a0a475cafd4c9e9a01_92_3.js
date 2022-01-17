function(cookie, target, context)
    {
        var items = [];
        items.push("-");

        var cookieName = Str.cropString(cookie.cookie.name, 40);
        var bp = context.cookies.breakpoints.findBreakpoint(cookie.cookie);

        items.push({
            nol10n: true,
            tooltiptext: Locale.$STRF("cookies.menu.tooltip.Break On Cookie", [cookieName]),
            label: Locale.$STRF("cookies.menu.Break On Cookie", [cookieName]),
            type: "checkbox",
            checked: bp != null,
            command: Obj.bindFixed(this.onBreakOnCookie, this, context, cookie),
        });

        if (bp)
        {
            items.push(
                {label: "cookies.menu.Edit Breakpoint Condition",
                    command: Obj.bindFixed(this.editBreakpointCondition, this, context, cookie) }
            );
        }

        return items;
    }