function isChild(parent, child){
      return parent === child || $(parent).find(child).length;
    }