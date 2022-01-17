function(){
    if (this._showingEmptyView){
      this.closeChildren();
      delete this._showingEmptyView;
    }
  }