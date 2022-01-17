function(file)
    {
        var text = "";

        if (file.responseStatus)
            text += file.responseStatus + " ";

        if (file.responseStatusText)
            text += file.responseStatusText;

        return text ? Str.cropString(text) : " ";
    }