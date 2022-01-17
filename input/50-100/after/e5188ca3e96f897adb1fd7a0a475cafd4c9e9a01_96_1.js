function(context)
    {
        return [
            MenuUtils.optionAllowGlobally(context, "cookies.AllowGlobally",
                "cookies.tip.AllowGlobally", "network.cookie", "cookieBehavior"),
            /*MenuUtils.optionMenu(context, "cookies.clearWhenDeny",
                "cookies.tip.clearWhenDeny", Firebug.prefDomain, clearWhenDeny),*/
            MenuUtils.optionMenu(context, "cookies.LogEvents",
                "cookies.tip.LogEvents", Firebug.prefDomain, logEventsPref),
            MenuUtils.optionMenu(context, "cookies.Confirm cookie removal",
                "cookies.tip.Confirm cookie removal", Firebug.prefDomain, removeConfirmation)
        ];
    }