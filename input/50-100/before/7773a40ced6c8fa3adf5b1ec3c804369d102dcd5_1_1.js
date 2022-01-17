function(dom) {
    if (!dom)
        return null;
    if (!dom.nodeType)
        dom = {namespaceURI: dom, tagName: arguments[1], nodeType: 1};
    if (dom.nodeType !== 1)
        return null;

    // Mapping back to the real namespace, in case it was dav
    var ns = dom.namespaceURI == "urn:DAV" ? "DAV:" : dom.namespaceURI;
    // Mapping to clark notation
    return "{" + ns + "}" + dom.tagName.toLowerCase();
}