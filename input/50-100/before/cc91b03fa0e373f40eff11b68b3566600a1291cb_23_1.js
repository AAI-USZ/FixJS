function(context)
    {
        return [
            MenuUtils.optionAllowGlobally(context, "firecookie.AllowGlobally",
                networkPrefDomain, cookieBehaviorPref),
            /*MenuUtils.optionMenu(context, "cookies.clearWhenDeny",
                Firebug.prefDomain, clearWhenDeny),*/
            MenuUtils.optionMenu(context, "cookies.LogEvents",
                Firebug.prefDomain, logEventsPref),
            MenuUtils.optionMenu(context, "firecookie.Confirm cookie removal",
                Firebug.prefDomain, removeConfirmation)
        ];
    }