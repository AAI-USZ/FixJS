function(charset, data)
    {
        try {
            var uniConv = Components.classes[this.suniconvCID].createInstance(this.suniconvIID);
            uniConv.charset = charset;
            data = uniConv.ConvertToUnicode(data);
        }
        catch (e) {
        }
        return data;
    }