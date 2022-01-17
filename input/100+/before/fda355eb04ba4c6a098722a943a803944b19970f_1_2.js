function(link, label, attrs) {
    var d = this.contentDocument;
    var anchor = d.createElement("a");
    var href = {};
    for (var name in attrs) {
        var value = attrs[name];
        href[name] = value;
        anchor.setAttribute(name, value);
    }
    anchor.href = link;
    anchor.title = link;
    anchor.setAttribute("onclick", "return false;");
    anchor.appendChild(d.createTextNode(label));
    return anchor;
}