function(object)
    {
        // The object could provide it's own custom ID.
        if (object instanceof Object && typeof(object.getId) == "function")
            return object.getId();

        // xxxHonza: this doesn't work for custom logs (e.g. cookies and XHR)
        //else if (typeof object == "string")
        //    return object;
        //else if (object instanceof Object && typeof object[0] != "undefined")
        //    return object[0];

        // Group messages coming from the same location.
        if (object instanceof Object && object.href && object.lineNo && object.message)
            return object.message + object.href + ":" + object.lineNo;
    }