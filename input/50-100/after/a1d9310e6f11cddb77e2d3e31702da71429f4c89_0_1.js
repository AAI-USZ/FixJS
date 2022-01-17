function Simulations(node) {
    if(!node) {
        Y.error(NAME+': invalid target node');
    }
    this.node = node;
    this.target = Y.Node.getDOMNode(node);

    var startXY = this.node.getXY(),
        dims = this._getDims();

    START_PAGEX = startXY[0] + (dims[0])/2;
    START_PAGEY = startXY[1] + (dims[1])/2;
}