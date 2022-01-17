function(tooltip, context)
    {
        var host = context.window.location.host;
        tooltip.label = Locale.$STRF("firecookie.export.Export_For_Site_Tooltip", [host]);
        return true;
    }