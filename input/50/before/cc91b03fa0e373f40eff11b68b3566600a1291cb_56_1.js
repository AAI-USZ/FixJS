function(prefDomain, name)
    {
        var prefName = prefDomain + "." + name;
        if (prefs.prefHasUserValue(prefName))
            prefs.clearUserPref(prefName);
    }