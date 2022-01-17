function(){
    if (this.showingEmptyView){
      this.closeChildren();
      delete this.showingEmptyView;
    }
  }