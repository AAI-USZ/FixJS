function(storage)
    {
        var object = this.objectView(storage);
        return Locale.$STRP("firebug.storage.totalItems", [Object.keys(object).length]);
    }