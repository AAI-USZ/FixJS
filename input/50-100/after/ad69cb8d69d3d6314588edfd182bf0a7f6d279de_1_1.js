function(title, items, modeless, callback)
    {
        var params = { core: this, title: title, items: items || [ "" ], values: null, modeless: modeless, callback: callback };
        var win = window.openDialog("chrome://ew/content/dialogs/input.xul", null, "chrome,centerscreen,resizable," + (modeless ? "modeless" : "modal"), params);
        return modeless ? win : (params.ok ? params.values : null);
    }