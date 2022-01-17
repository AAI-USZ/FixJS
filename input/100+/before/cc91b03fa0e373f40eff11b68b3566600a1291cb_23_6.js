function(object, target)
    {
        var items = [];

        // If the user clicked at a cookie row, the context menu is already
        // initialized and so, bail out.
        var cookieRow = Dom.getAncestorByClass(target, "cookieRow");
        if (cookieRow)
            return items;

        // Also bail out if the user clicked on the header.
        var header = Dom.getAncestorByClass(target, "cookieHeaderRow");
        if (header)
            return items;

        // Make sure default items (cmd_copy) is removed.
        CookieReps.Rep.getContextMenuItems.apply(this, arguments);

        // Create Paste menu-item so, a new cookie can be pasted even if the user
        // clicks within the panel area (not on a cookie row)
        items.push({
            label: Locale.$STR("firecookie.Paste"),
            nol10n: true,
            disabled: CookieClipboard.isCookieAvailable() ? false : true,
            command: Obj.bindFixed(CookieReps.CookieRow.onPaste, CookieReps.CookieRow)
        });

        return items;
    }