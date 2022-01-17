function(){
      spyOn(ItemView.prototype, "onRender");

      collection = new Backbone.Collection();
      collectionView = new CollectionView({
        itemView: ItemView,
        collection: collection
      });
      collectionView.render();

      spyOn(collectionView, "appendHtml").andCallThrough();

      model = new Backbone.Model({foo: "bar"});
      collection.add(model);
    }