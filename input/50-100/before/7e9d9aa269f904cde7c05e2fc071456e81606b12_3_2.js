function (node) {

    var stateset = node.getStateSet();
    if (stateset) {
        this.pushStateSet(stateset);
    }

    var light = node.getLight();
    if (light) {
        this.addPositionedAttribute(light);
    }

    this.traverse(node);

    if (stateset) {
        this.popStateSet();
    }
}