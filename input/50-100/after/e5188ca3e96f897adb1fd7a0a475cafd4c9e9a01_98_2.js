function(cookie)
    {
        if (cookie.cookie.expires == undefined)
            return "";

        // The first character is space so, if the table is sorted according
        // to this column, all "Session" cookies are displayed at the begining.
        if (cookie.cookie.expires == 0)
            return " " + Locale.$STR("cookies.Session");

        try
        {
            // Format the expires date using the current locale.
            var date = new Date(cookie.cookie.expires * 1000);
            return date.toLocaleString();
        }
        catch (err)
        {
            if (FBTrace.DBG_ERRORS)
                FBTrace.sysout("cookies.CookieRow.getExpires; EXCEPTION " + err, err);
        }

        return "";
    }