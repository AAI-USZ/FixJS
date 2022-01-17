function emphasize_name(url) {
    var len = url.length;
    var i = url.lastIndexOf("/");
    var s;
    if (i == len-1)
        return url;
    else if (i < 0)
        return "<b>"+url+"</b>";
    else
        return url.substr(0,i+1) + "<b>&#8203;" + url.substr(i+1) + "</b>";
    // zero-width space above, breaks line if needed
}