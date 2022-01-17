function(){
    var collectionView;
    var collection;
    var childView;
    var model;

    beforeEach(function(){
      model = new Backbone.Model({foo: "bar"});
      collection = new Backbone.Collection();
      collection.add(model);

      collectionView = new CollectionView({
        itemView: ItemView,
        collection: collection
      });
      collectionView.render();

      childView = collectionView.children[model.cid];
      spyOn(childView, "close").andCallThrough();

      collection.remove(model);
    });

    it("should close the model's view", function(){
      expect(childView.close).toHaveBeenCalled();
    });

    it("should remove the model-view's HTML", function(){
      expect($(collectionView.$el).children().length).toBe(0);
    });
  }