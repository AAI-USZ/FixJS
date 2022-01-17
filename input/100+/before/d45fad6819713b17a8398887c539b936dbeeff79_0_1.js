function(){
    this.render = Backbone.Marionette.CollectionView.prototype.render;
    this.renderItemView = Backbone.Marionette.CollectionView.prototype.renderItemView;
    this.showCollection = Backbone.Marionette.CollectionView.prototype.showCollection;
    this.showEmptyView = Backbone.Marionette.CollectionView.prototype.showEmptyView;

    // replace the standard render with an async render
    _.extend(Backbone.Marionette.CollectionView.prototype, Backbone.Marionette.Async.CollectionView);
  }