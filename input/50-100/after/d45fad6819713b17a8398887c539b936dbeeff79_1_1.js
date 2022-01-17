function(promises){
    var promise;
    var EmptyView = this.options.emptyView || this.emptyView;
    if (EmptyView && !this._showingEmptyView){
      this._showingEmptyView = true;
      var model = new Backbone.Model();
      promise = this.addItemView(model, EmptyView, 0);
    }
    return promise;
  }