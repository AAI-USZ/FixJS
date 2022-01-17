function Entity(node) {
    this.id = node.id;
    this.value = new Expression(node.value);
    this.index = [];
    node.index.forEach(function(ind) {
      this.index.push(new Expression(ind));
    }, this);
    this.attributes = {};
    node.attrs.forEach(function(attr) {
      this.attributes[attr.id] = new Attribute(attr);
    }, this);
    this.local = node.local || false;
  }