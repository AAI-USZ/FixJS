function(){
    var collectionView;
    var childView;

    var model = new Backbone.Model({foo: "bar"});

    var EmptyView = Backbone.Marionette.ItemView.extend({
      render: function(){}
    });

    var CollectionView = Backbone.Marionette.CollectionView.extend({
      itemView: ItemView,
      emptyView: EmptyView,

      render: function(){
        var ItemView = this.getItemView();
        this.addItemView(model, ItemView, 0);
      }
    });

    beforeEach(function(){
      collectionView = new CollectionView({});
      collectionView.render();

      childView = collectionView.children[model.cid];
      spyOn(childView, "close").andCallThrough();
      spyOn(EmptyView.prototype, "render");

      collectionView.removeItemView(model);
    });

    it("should close the model's view", function(){
      expect(childView.close).toHaveBeenCalled();
    });

    it("should show the empty view", function(){
      expect(EmptyView.prototype.render.callCount).toBe(1);
    });
  }