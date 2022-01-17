function(){
    this.triggerBeforeRender();
    this.closeChildren();

    if (this.collection && this.collection.length > 0) {
      this.showCollection();
    } else {
      this.showEmptyView();
    }

    this.triggerRendered();
    return this;
  }