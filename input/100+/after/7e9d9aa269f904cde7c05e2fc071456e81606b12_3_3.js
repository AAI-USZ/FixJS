function (node) {
    lastMatrixStack = this._projectionMatrixStack[this._projectionMatrixStack.length-1];
    var matrix = this._getReservedMatrix();
    osg.Matrix.mult(lastMatrixStack, node.getProjectionMatrix(), matrix);
    this.pushProjectionMatrix(matrix);

    var stateset = node.getStateSet();

    if (stateset) {
        this.pushStateSet(stateset);
    }

    this.handleCullCallbacksAndTraverse(node);

    if (stateset) {
        this.popStateSet();
    }

    this.popProjectionMatrix();
}