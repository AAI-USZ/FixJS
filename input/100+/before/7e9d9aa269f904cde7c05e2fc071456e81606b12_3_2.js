function (node) {
    var matrix = this._getReservedMatrix();

    if (node.getReferenceFrame() === osg.Transform.RELATIVE_RF) {
        var lastMatrixStack = this._modelviewMatrixStack[this._modelviewMatrixStack.length-1];
        osg.Matrix.mult(lastMatrixStack, node.getMatrix(), matrix);
    } else {
        // absolute
        osg.Matrix.copy(node.getMatrix(), matrix);
    }
    this.pushModelviewMatrix(matrix);


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
    
    this.popModelviewMatrix();

}