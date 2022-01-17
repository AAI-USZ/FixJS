function(type)
    {
        try {
            return Components.classes['@mozilla.org/file/directory_service;1'].createInstance(Components.interfaces.nsIProperties).get(type, Components.interfaces.nsIFile);
        }
        catch (e) {
            return false;
        }
    }