function (node) {

    var stateset = node.getStateSet();
    if (stateset) {
        this.pushStateSet(stateset);
    }
    if (node.light) {
        this.addPositionedAttribute(node.light);
    }

    if (node.traverse) {
        this.traverse(node);
    }

    if (stateset) {
        this.popStateSet();
    }
}