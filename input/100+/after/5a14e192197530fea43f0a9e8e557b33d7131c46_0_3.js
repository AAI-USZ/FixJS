function unhighlight(node, color) {
    //if the passed color string isn't a Color object, convert it
    if (!(color instanceof Color)) {
        color = new Color(color);
    }
    //test to see if we've found an element node that has our same backgroundColor
    if (node.nodeType == 1) {
        var bg = node.style.backgroundColor;
        if (bg && color.equals(new Color(bg))) {
            //remove background color
            node.style.backgroundColor = "";
            if (node.tagName.toLowerCase() =="span") {
                var parentNode = node.parentNode;
                removeSpanTag(node);
                unhighlight(parentNode, "ffff00");
            }
        }
    }
    //now recurse through all children of the passed node
    var child = node.firstChild;
    while (child) {
        unhighlight(child, color);
        child = child.nextSibling;
    }
}