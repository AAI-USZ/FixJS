function(tooltip, context)
    {
        if (tooltip.fcEnabled)
        {
            var host = context.window.location.host;
            tooltip.label = Locale.$STRF("firecookie.perm.manage.tooltip", [host]);
        }

        return tooltip.fcEnabled;
    }