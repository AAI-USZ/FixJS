function Border(node, borderType, nextProperty){
    this.nextProperty = nextProperty;
    this.ancestors = node.parentsUntil(".preview");
    this.block = this.ancestors[this.ancestors.length - 1] || node[0];
    this.borderNode = this.ancestors[this.ancestors.length -2] || node[0];
    while(this.borderNode){
      this.node = this.borderNode;
      if(!borderType || this.borderNode.nodeName.toLowerCase() === borderType){
        break;
      }
      this.borderNode = this.borderNode[nextProperty];
    }
    this.safeBlock = this.borderNode ? this.block : this.block[nextProperty];
  }