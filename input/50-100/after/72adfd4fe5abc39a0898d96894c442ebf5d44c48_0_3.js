function(charset, data)
    {
        try {
            var uniConv = Components.classes['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
            uniConv.charset = charset;
            data = uniConv.ConvertToUnicode(data);
        }
        catch (e) {
        }
        return data;
    }