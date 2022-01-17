function Simulations(node) {
    if(!node) {
        Y.error(NAME+': invalid target node');
    }
    this.node = node;
    this.target = Y.Node.getDOMNode(node);

    START_PAGEX = this.node.getX() + this.target.getBoundingClientRect().width/2;
    START_PAGEY = this.node.getY() + this.target.getBoundingClientRect().height/2;
}