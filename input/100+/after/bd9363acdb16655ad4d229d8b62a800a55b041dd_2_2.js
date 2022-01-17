function Border(node, borderType, nextProperty){
    this.nextProperty = nextProperty;

    if(node.is('.preview')){ // select all (even selection of all
      // nodes within preview) in firefox does select the whole preview div
      if(nextProperty === 'nextSibling'){
        node = $(node[0].lastChild);
      } else {
        node = $(node[0].firstChild);
      }
    }
    
    this.ancestors = node.parentsUntil(".preview");
    this.block = this.ancestors[this.ancestors.length - 1] || node[0];
    
    var depth = borderType ? 2 : 1;
    this.borderNode = this.ancestors[this.ancestors.length -depth] || node[0];
    
    while(this.borderNode){
      this.node = this.borderNode;
      if(this.borderNode.nodeName.toLowerCase() === borderType){
        break;
      } else if (/preview/.test(this.node.parentNode.className)){
        this.borderNode = null;
        break;
      }
      this.borderNode = this.borderNode[nextProperty];
    }
    
    this.safeBlock = this.borderNode ? this.block : this.block[nextProperty];
  }