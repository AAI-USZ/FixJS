function(context)
    {
        var params = {  
            blockVisible   : true,
            sessionVisible : true,
            allowVisible   : true,
            prefilledHost  : "",
            permissionType : "cookie",
            windowTitle    : Locale.$STR("firecookie.ExceptionsTitle"),
            introText      : Locale.$STR("firecookie.Intro")
        };

        parent.openDialog("chrome://browser/content/preferences/permissions.xul",
            "_blank","chrome,resizable=yes", params);
    }