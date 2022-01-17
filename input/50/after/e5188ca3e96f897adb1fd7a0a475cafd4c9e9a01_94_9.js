function(tooltip, context)
    {
        var host = context.window.location.host;
        tooltip.label = Locale.$STRF("cookies.export.Export_For_Site_Tooltip", [host]);
        return true;
    }