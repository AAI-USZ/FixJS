function(tooltip, context)
    {
        var host = context.window.location.host;
        tooltip.label = Locale.$STRF("cookies.createcookie.tooltip", [host]);
        return true;
    }