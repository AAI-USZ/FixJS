function (node) {
        return fluid.findAncestor(node, function (element) {
            return element.nodeName.toLowerCase() === "form";
        });
    }