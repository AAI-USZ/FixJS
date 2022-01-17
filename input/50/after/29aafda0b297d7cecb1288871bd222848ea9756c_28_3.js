function()
{
    if (navigator.appVersion.indexOf("Win") != -1)
        return "\r\n";

    if (navigator.appVersion.indexOf("Mac") != -1)
        return "\r";

    return "\n";
}