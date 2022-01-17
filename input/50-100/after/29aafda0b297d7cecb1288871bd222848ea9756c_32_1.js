function(file)
    {
        var text = "";

        if (file.responseStatus)
            text += file.responseStatus + " ";

        if (file.responseStatusText)
            text += file.responseStatusText;

        text = text ? Str.cropString(text) : " ";

        if (file.fromBFCache)
            text += " (BFCache)";

        return text;
    }