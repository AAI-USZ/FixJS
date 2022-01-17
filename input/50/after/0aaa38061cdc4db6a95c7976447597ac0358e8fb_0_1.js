function(){
    if (EmptyView && !this.showingEmptyView){
      this.closeChildren();
      delete this.showingEmptyView;
    }
  }