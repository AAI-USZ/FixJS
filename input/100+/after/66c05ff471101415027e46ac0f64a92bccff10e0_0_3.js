function() {
    var stylesheets = [];
    var paths = { stylesheets: stylesheets, base: '/' };

    var d = document;
    var head = d.getElementsByTagName("head")[0];
    var links = head.getElementsByTagName("link");
    var length = links.length;
    for (var i = 0; i < length; i++) {
        var link = links[i];
        var href = link.getAttribute("href") || "";
        var type = link.getAttribute("type") || "";
        switch ((link.getAttribute("rel") || "").toLowerCase()) {
        case "wysiwyg.base":
            paths.base = href;
            break;
        case "wysiwyg.stylesheet":
            stylesheets.push(href);
            break;
        }
    }
    if (paths.base && stylesheets.length > 0) {
        return paths;
    }
    return null;
}