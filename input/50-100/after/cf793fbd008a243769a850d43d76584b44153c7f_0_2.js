function Block(node){
    var __this = this instanceof __ctor ? this : new __ctor;
    __this.lines = [];
    if (!node) {
      return __this;
    }
    node = node.unparen();
    if (node instanceof Block) {
      return node;
    }
    __this.add(node);
    return __this;
  } function __ctor(){}