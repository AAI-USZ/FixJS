function(doc, url)
{
    var style = doc.createElementNS("http://www.w3.org/1999/xhtml", "style");
    style.setAttribute("charset", "utf-8");
    style.setAttribute("type", "text/css");

    var cssText = url ? Http.getResource(url) : null;
    if (cssText)
    {
        var index = url.lastIndexOf("/");
        var absURL = url.substr(0, index+1);

        // Replace all relative URLs with absolute (using the passed url).
        // Note that stylesheets can come from various extensions and the source can
        // be even used in a browser env where relative URLs make more sense.
        var expr = /url\(([\'"]?)(?![\'"]?(?:[a-z]+:|\/))/gi;
        cssText = cssText.replace(expr, "url($1" + absURL);

        style.innerHTML = cssText;
    }

    Firebug.setIgnored(style);
    return style;
}