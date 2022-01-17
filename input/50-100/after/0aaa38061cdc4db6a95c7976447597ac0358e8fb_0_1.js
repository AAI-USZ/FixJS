function(){
    this.triggerBeforeRender();
    this.closeEmptyView();
    this.closeChildren();
    
    if (this.collection && this.collection.length > 0) {
      this.showCollection();
    } else {
      this.showEmptyView();
    }

    this.triggerRendered();
    return this;
  }