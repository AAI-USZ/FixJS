function(tooltip, context)
    {
        var host = context.window.location.host;
        tooltip.label = Locale.$STRF("firecookie.createcookie.tooltip", [host]);
        return true;
    }