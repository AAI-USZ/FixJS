function(promises){
    var promise;
    var EmptyView = this.options.emptyView || this.emptyView;
    if (EmptyView){
      this.showingEmptyView = true;
      var model = new Backbone.Model();
      promise = this.addItemView(model, EmptyView, 0);
    }
    return promise;
  }