function(title, items, modeless)
    {
        var params = { core: this, title: title, items: items || [ "" ], values: null, modeless: modeless };
        var win = window.openDialog("chrome://ew/content/dialogs/input.xul", null, "chrome,centerscreen,resizable," + (modeless ? "modeless" : "modal"), params);
        return modeless ? win : (params.ok ? params.values : null);
    }