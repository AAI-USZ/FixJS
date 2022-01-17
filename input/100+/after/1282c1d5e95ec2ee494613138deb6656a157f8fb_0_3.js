function Attribute(node) {
    this.id = node.id;
    this.local = node.local || false;
    this.value = new Expression(node.value);
  }