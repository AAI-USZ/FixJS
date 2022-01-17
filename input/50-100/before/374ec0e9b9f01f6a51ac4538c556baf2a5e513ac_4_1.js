function(){
    var EmptyView = this.options.emptyView || this.emptyView;
    if (EmptyView){
      this.showingEmptyView = true;
      var model = new Backbone.Model();
      this.addItemView(model, EmptyView, 0);
    }
  }