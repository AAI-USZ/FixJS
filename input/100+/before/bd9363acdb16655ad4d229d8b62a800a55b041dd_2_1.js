function lastParentBeforePreview(node){
    if(node.parent().is(".preview")){
      return node;
    } else {
      return node.parentsUntil(".preview").last();
    }
  }