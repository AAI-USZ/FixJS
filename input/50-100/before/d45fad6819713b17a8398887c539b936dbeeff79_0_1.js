function(){
      spyOn(ItemView.prototype, "onRender");

      collection = new Collection();
      collectionView = new CollectionView({
        itemView: ItemView,
        collection: collection
      });
      collectionView.render();

      spyOn(collectionView, "appendHtml").andCallThrough();

      model = new Model({foo: "bar"});
      collection.add(model);
    }