function(charset, data)
    {
        try {
            var uniConv = Components.classes['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
            uniConv.charset = charset;
            data = uniConv.ConvertFromUnicode(data);
        }
        catch (e) {
        }
        return data;
    }