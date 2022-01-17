function unhighlight(node, color) {
    if (!(color instanceof Color)) {
        color = new Color(color);
    }

    if (node.nodeType == 1) {
        var bg = node.style.backgroundColor;
        if (bg && color.equals(new Color(bg))) {
            node.style.backgroundColor = "";
        }
    }
    var child = node.firstChild;
    while (child) {
        unhighlight(child, color);
        child = child.nextSibling;
    }
}